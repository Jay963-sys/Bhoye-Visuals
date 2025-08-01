"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Video } from "@prisma/client";
import { PlayCircle } from "lucide-react";

export default function WorksPreview() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos/latest");
        const data = await res.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) {
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    });
  }, [videos]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section
      id="projects"
      className="relative min-h-screen snap-start bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] text-white px-4 sm:px-6 md:px-10 py-24 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 🌀 Background Effects */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute w-[500px] h-[500px] bg-[#FF3100]/40 rounded-full blur-3xl animate-pulse-slow left-[-100px] top-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-[#FF3100]/30 rounded-full blur-2xl animate-pulse-slower right-[-80px] bottom-[-80px]" />
      </motion.div>

      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-0" />

      {/* 🔠 Heading */}
      <motion.h2
        className="relative z-10 text-3xl md:text-4xl font-extrabold text-[#FF3100] mb-4 tracking-tight text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Featured Works
      </motion.h2>

      {/* 📝 Subtitle */}
      <motion.p
        className="relative z-10 text-center max-w-2xl text-gray-400 mb-12 text-sm sm:text-base md:text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        viewport={{ once: true }}
      >
        A curated glimpse into recent videography projects — cinematic edits,
        powerful visuals, and bold storytelling.
      </motion.p>

      {/* 🎞️ Video Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl px-2">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            className="group relative aspect-video bg-[#222222] rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_#FF3100aa] transition-shadow duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            onClick={() => setSelectedVideo(video)}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[i] = el;
              }}
              src={video.url}
              muted
              playsInline
              loop
              preload="auto"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* 🔘 Overlay Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300">
              <PlayCircle className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform" />
            </div>

            {/* 📽 Title Overlay */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-2 text-sm text-white font-medium">
              {video.title || "Untitled Project"}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 📁 View All Link */}
      <Link
        href="/projects"
        className="relative z-10 mt-12 text-sm sm:text-base font-semibold text-[#FF3100] hover:text-white border border-[#FF3100] hover:bg-[#FF3100] px-6 py-2 rounded-full transition-all duration-300 shadow-md"
      >
        View All Works →
      </Link>

      {/* 🎬 Fullscreen Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.video
              src={selectedVideo.url}
              controls
              autoPlay
              className="max-w-5xl w-full h-auto rounded-xl shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 50) {
                  setSelectedVideo(null);
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
