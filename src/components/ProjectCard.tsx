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

    const v = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      msRequestFullscreen?: () => void;
    };

    if (v.requestFullscreen) {
      v.requestFullscreen();
    } else if (v.webkitEnterFullscreen) {
      v.webkitEnterFullscreen();
    } else if (v.msRequestFullscreen) {
      v.msRequestFullscreen();
    }
  };

  const aspectClass =
    orientation === "portrait" ? "aspect-[9/16]" : "aspect-video";

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
      {/* 🔥 Video */}
      <div className={`relative w-full ${aspectClass}`}>
        <video
          ref={videoRef}
          src={url}
          poster={url.replace("/video/upload/", "/video/upload/so_0/") + ".jpg"}
          onClick={handleFullscreen}
          className="w-full h-full object-cover group-hover:brightness-75 
                     transition duration-300 cursor-pointer"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* 🔥 Gradient Overlay */}
        <div
          className="absolute inset-0 
                        bg-gradient-to-t from-[#FF3100]/40 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 
                        transition duration-500 pointer-events-none"
        />
      </div>

      {/* 🔥 Text Content */}
      <div className="p-4 text-gray-200">
        <h3
          className="text-lg font-semibold truncate 
                       group-hover:text-[#FF3100] 
                       transition duration-300"
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
