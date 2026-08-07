import { useEffect, useRef, useState } from "react";

interface HoverPlayMediaProps {
  /** Path to a video file (mp4/webm). When omitted, the component renders the
   *  poster image only — no <video> element is mounted and no hover behavior. */
  videoSrc?: string;
  /** Path to the still image shown when the video is paused (and as a fallback
   *  if no video is provided). */
  posterSrc: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  /** When the parent has Tailwind's `group` class, the video will also start
   *  playing on `group-hover` / `group-focus` of the parent, not just on
   *  hover of the media element itself. Defaults to true. */
  playOnGroupHover?: boolean;
}

/**
 * YCombinator-style hover-play media tile.
 *
 * Behavior:
 * - Renders the poster image initially.
 * - On hover (or keyboard focus) of the parent group, starts playing the
 *   muted, looping video.
 * - On leave/blur, pauses and resets the video to the first frame so the
 *   next hover starts cleanly.
 * - Adds a `hover-pan-zoom` class so a Ken Burns pan/zoom animation runs
 *   on hover. This makes the tile feel alive even before per-card video
 *   files exist, and stays in place once they do (CSS transform stacks on
 *   the playing video element fine).
 * - Respects `prefers-reduced-motion`: when the user prefers reduced motion
 *   the video never auto-plays and the pan/zoom animation is disabled
 *   (only the static poster shows).
 * - Falls back gracefully to the poster image when no `videoSrc` is provided
 *   (useful while video assets are still being produced).
 */
export default function HoverPlayMedia({
  videoSrc,
  posterSrc,
  alt,
  className = "",
  width,
  height,
  playOnGroupHover = true,
}: HoverPlayMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Track the user's reduced-motion preference. Declared up here, before any
  // conditional return below, so the hook order stays stable across renders
  // (React Hooks rule #1).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // If we have no video source, or the user prefers reduced motion, we'll
  // render the still poster instead of the <video>. Compute the flag first
  // so the effect below can use it as a dep and bail out when not needed.
  const showFallback = !videoSrc || reducedMotion;

  // The `group-hover:` / `group-focus:` pseudo-class equivalents can't be
  // expressed declaratively for a `play()` call, so we attach listeners on
  // the nearest `.group` ancestor at mount time when `playOnGroupHover` is
  // on. We always declare the hook, but it's a no-op when we're falling
  // back to the still image (no video to play).
  useEffect(() => {
    if (showFallback || !playOnGroupHover) return;
    const v = videoRef.current;
    if (!v) return;
    const group = v.closest(".group") as HTMLElement | null;
    if (!group) return;

    const play = () => {
      // play() returns a Promise that rejects if the browser blocks
      // autoplay or the source 404s. Swallow it — we just stay on the
      // poster frame, and the CSS pan/zoom keeps the tile feeling alive.
      void v.play().catch(() => {});
    };
    const pause = () => {
      v.pause();
      v.currentTime = 0;
    };

    group.addEventListener("mouseenter", play);
    group.addEventListener("mouseleave", pause);
    group.addEventListener("focusin", play);
    group.addEventListener("focusout", pause);
    return () => {
      group.removeEventListener("mouseenter", play);
      group.removeEventListener("mouseleave", pause);
      group.removeEventListener("focusin", play);
      group.removeEventListener("focusout", pause);
    };
  }, [showFallback, playOnGroupHover]);

  // Compose the hover animation class with whatever positioning/sizing
  // classes the caller passes in. We always include `hover-pan-zoom` so the
  // image moves on hover — the CSS rule itself bows out for reduced-motion.
  const mediaClass = `${className} hover-pan-zoom`.trim();

  if (showFallback) {
    return (
      <img
        src={posterSrc}
        alt={alt}
        width={width}
        height={height}
        className={mediaClass}
        loading="lazy"
      />
    );
  }

  // Direct-on-element handlers as a backup to the group-level listeners,
  // so a hover that only crosses the media element (not the whole card)
  // still plays. The closures intentionally read videoRef.current each
  // call so they don't need to be in the effect's dep array.
  const playOnElement = () => {
    const v = videoRef.current;
    if (!v) return;
    void v.play().catch(() => {});
  };
  const pauseOnElement = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      poster={posterSrc}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      width={width}
      height={height}
      className={mediaClass}
      onMouseEnter={playOnElement}
      onMouseLeave={pauseOnElement}
      onFocus={playOnElement}
      onBlur={pauseOnElement}
    />
  );
}
