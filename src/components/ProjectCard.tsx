"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import VideoPreview from "./VideoPreview";
import { Video } from "@prisma/client";

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
  const [open, setOpen] = useState(false);

  // Play Cloudinary videos on load
  useEffect(() => {
    if (source === "cloudinary") videoRef.current?.play().catch(() => {});
  }, [source]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const aspectClass =
    orientation === "portrait" ? "aspect-[9/16]" : "aspect-video";

  const renderContent = () => {
    // Use VideoPreview for consistent thumbnail behavior
    return (
      <div
        className={`relative w-full h-full ${aspectClass} cursor-pointer`}
        onClick={() => setOpen(true)}
      >
        <VideoPreview source={source} url={url} youtubeId={youtubeId} />
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
    <>
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

      {/* FULLSCREEN MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          {source === "cloudinary" && url && (
            <video
              src={url}
              controls
              autoPlay
              className="max-w-[90vw] max-h-[90vh] rounded-lg object-cover"
              onClick={(e) => e.stopPropagation()}
            />
          )}

          {source === "youtube" && youtubeId && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              allow="autoplay; fullscreen"
              className={`w-[90vw] h-[calc(90vw*9/16)] max-h-[80vh] rounded-lg object-cover`}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </>
  );
}
