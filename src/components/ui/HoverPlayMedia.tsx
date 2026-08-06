import { useRef } from "react";

interface HoverPlayMediaProps {
  src: string;
  videoSrc?: string;
  alt: string;
  className?: string;
}

export default function HoverPlayMedia({ src, videoSrc, alt, className }: HoverPlayMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!videoSrc) {
    return <img src={src} className={className} alt={alt} />;
  }

  const play = () => videoRef.current?.play();
  const reset = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <video
      ref={videoRef}
      className={className}
      poster={src}
      src={videoSrc}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
      onMouseEnter={play}
      onMouseLeave={reset}
      onFocus={play}
      onBlur={reset}
      tabIndex={0}
    />
  );
}
