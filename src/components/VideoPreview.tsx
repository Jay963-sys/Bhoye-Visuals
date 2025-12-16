"use client";

import Image from "next/image";
import { videoThumbnails } from "@/lib/videoThumbnails";

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
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  // 🔹 YOUTUBE PREVIEW (custom thumbnail)
  if (source === "youtube" && youtubeId) {
    const safeId =
      youtubeId.trim().split("v=")[1]?.split("&")[0] ?? youtubeId.trim();

    const thumbnail = videoThumbnails[safeId] ?? "/thumbnails/fallback.jpg";

    return (
      <div className="absolute inset-0">
        <Image
          src={thumbnail}
          alt="Video thumbnail"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
    );
  }
  return null;
}
