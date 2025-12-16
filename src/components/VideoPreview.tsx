"use client";

import { useEffect, useRef } from "react";

type VideoPreviewProps = {
  source: "cloudinary" | "youtube";
  url?: string;
  youtubeId?: string;
};

export default function VideoPreview({
  source,
  url,
  youtubeId,
}: VideoPreviewProps) {
  // 🔹 CLOUDINARY PREVIEW
  if (source === "cloudinary" && url) {
    return (
      <video
        src={url}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
    );
  }

  // 🔹 YOUTUBE PREVIEW
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  }, []);

  if (!youtubeId) return null;

  return (
    <iframe
      ref={iframeRef}
      src={`https://www.youtube.com/embed/${youtubeId}
        ?autoplay=1
        &mute=1
        &loop=1
        &playlist=${youtubeId}
        &controls=0
        &modestbranding=1
        &playsinline=1
        &rel=0`}
      allow="autoplay; encrypted-media"
      loading="lazy"
      className="w-full h-full object-cover pointer-events-none"
    />
  );
}
