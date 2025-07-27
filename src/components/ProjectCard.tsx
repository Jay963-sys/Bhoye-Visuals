"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ProjectCardProps {
  title: string;
  url: string;
  orientation?: string;
}

export default function ProjectCard({
  title,
  url,
  orientation = "landscape",
}: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) video.requestFullscreen();
    // Handle mobile fullscreen quirks
    else if ((video as any).webkitEnterFullscreen)
      (video as any).webkitEnterFullscreen();
    else if ((video as any).msRequestFullscreen)
      (video as any).msRequestFullscreen();
  };

  const aspectClass =
    orientation === "portrait" ? "aspect-[9/16]" : "aspect-video";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="relative rounded-xl overflow-hidden border border-neutral-800 bg-black shadow-lg group"
    >
      <div className={`relative w-full ${aspectClass}`}>
        <video
          ref={videoRef}
          src={url}
          onClick={handleFullscreen}
          className="w-full h-full object-cover group-hover:brightness-75 transition duration-300 cursor-pointer"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
      </div>

      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold truncate">
          {title.replace(/\.[^/.]+$/, "")}
        </h3>
        {orientation && (
          <p className="text-sm text-gray-400 mt-1 capitalize">
            Orientation: {orientation}
          </p>
        )}
      </div>
    </motion.div>
  );
}
