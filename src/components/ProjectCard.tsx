"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import VideoPreview from "./VideoPreview";

interface ProjectCardProps {
  title: string;
  url?: string;
  youtubeId?: string;
  orientation?: string;
  source: "cloudinary" | "youtube";
}

export default function ProjectCard({
  title,
  url,
  youtubeId,
  orientation = "landscape",
  source,
}: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (source === "cloudinary") videoRef.current?.play().catch(() => {});
  }, [source]);

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    const v = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      msRequestFullscreen?: () => void;
    };

    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    else if (v.msRequestFullscreen) v.msRequestFullscreen();
  };

  const aspectClass =
    orientation === "portrait" ? "aspect-[9/16]" : "aspect-video";

  const renderContent = () => {
    if (source === "youtube" && youtubeId) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?controls=0`}
          title={title}
          className="w-full h-full object-cover pointer-events-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      );
    }

    return (
      <div className={`relative w-full ${aspectClass}`}>
        <VideoPreview source={source} url={url} youtubeId={youtubeId} />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 
               bg-gradient-to-t from-[#FF3100]/40 via-transparent to-transparent 
               opacity-0 group-hover:opacity-100 
               transition duration-500 pointer-events-none"
        />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden border border-white/20 
                 bg-black shadow-md shadow-white/5 group 
                 hover:shadow-[0_0_25px_#FF3100aa] 
                 hover:border-[#FF3100] 
                 transition-all duration-500"
    >
      <div className={`relative w-full ${aspectClass}`}>
        {renderContent()}

        <div
          className="absolute inset-0 
                        bg-gradient-to-t from-[#FF3100]/40 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 
                        transition duration-500 pointer-events-none"
        />
      </div>

      <div className="p-4 text-gray-200">
        <h3
          className="text-lg font-semibold truncate 
                       group-hover:text-[#FF3100] transition duration-300"
        >
          {title.replace(/\.[^/.]+$/, "")}
        </h3>
        {orientation && (
          <p className="text-sm text-gray-400 mt-1 capitalize">
            Orientation: <span className="text-white/70">{orientation}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}
