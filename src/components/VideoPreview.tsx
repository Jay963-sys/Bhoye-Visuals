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

  // 🔹 YOUTUBE PREVIEW (Thumbnail only)
  if (source === "youtube" && youtubeId) {
    return (
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
        alt="YouTube preview"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  }
}
