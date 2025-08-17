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
      className="relative overflow-hidden min-h-screen snap-start bg-black text-white px-4 sm:px-6 md:px-10 py-20 md:py-28 flex flex-col items-center justify-center"
    >
      {/* ⚪ Subtle Animated Blobs (neutral greyscale) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[60vw] h-[60vw] bg-white/5 opacity-30 rounded-full filter blur-3xl animate-pulse-slow top-[-20%] left-[-20%]" />
        <div className="absolute w-[50vw] h-[50vw] bg-white/10 opacity-20 rounded-full filter blur-2xl animate-pulse-slower top-[40%] right-[-15%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-white/5 opacity-10 rounded-full filter blur-2xl animate-pulse-slow bottom-[-10%] left-[30%]" />
      </div>

      {/* 🎞 Film grain overlay */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay z-0 pointer-events-none" />

      {/* ⬛ Gradient fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-0" />

      {/* 🧠 Section Title */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center text-white z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Featured Works
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-center text-base sm:text-lg text-white/70 mb-12 max-w-xl z-10 px-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.9 }}
        viewport={{ once: true }}
      >
        A curated glimpse into recent videography projects — cinematic edits,
        powerful visuals, and bold storytelling.
      </motion.p>

      {/* 🎬 Video Grid */}
      <motion.div
        className="grid md:grid-cols-2 gap-8 max-w-5xl w-full z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            className="group relative aspect-video bg-neutral-900 rounded-2xl overflow-hidden border border-white/20 hover:border-white hover:shadow-[0_0_24px_rgba(255,255,255,0.5)] transition duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
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

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300">
              <PlayCircle className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform" />
            </div>

            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-2 text-sm text-white font-medium">
              {video.title || "Untitled Project"}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 📁 View All Link */}
      <Link
        href="/projects"
        className="relative z-10 mt-12 text-sm sm:text-base font-semibold text-white border border-white hover:bg-white hover:text-black px-6 py-2 rounded-full transition-all duration-300 shadow-md"
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
