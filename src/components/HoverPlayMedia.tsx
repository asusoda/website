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
 * - Respects `prefers-reduced-motion`: if the user prefers reduced motion
 *   the video never auto-plays — only the poster shows.
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

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // If we have no video source or the user prefers reduced motion, just show
  // the still poster — keeps the markup simple and avoids loading bytes we
  // won't ever play.
  if (!videoSrc || reducedMotion) {
    return (
      <img
        src={posterSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading="lazy"
      />
    );
  }

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    // play() returns a Promise that rejects if the browser blocks autoplay.
    // Swallow the rejection — we just stay on the poster frame in that case.
    void v.play().catch(() => {});
  };

  const pause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  // The `group-hover:` / `group-focus:` pseudo-class equivalents can't be
  // expressed declaratively for a `play()` call, so we attach listeners on
  // the nearest `.group` ancestor at mount time when `playOnGroupHover` is on.
  useEffect(() => {
    if (!playOnGroupHover) return;
    const v = videoRef.current;
    if (!v) return;
    const group = v.closest(".group") as HTMLElement | null;
    if (!group) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playOnGroupHover, videoSrc]);

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
      className={className}
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
    />
  );
}
