"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Video } from "@prisma/client";
import { Play, X, ArrowUpRight } from "lucide-react";

// Helper to extract YouTube ID
const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function WorksPreview() {
  // Initialize as empty array
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos/latest");
        const data = await res.json();

        // 🛡️ SAFETY CHECK: Only set videos if data is actually an array
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error("API returned invalid data:", data);
          setVideos([]); // Fallback to empty array prevents the crash
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]); // Fallback on network error
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    if (selectedVideo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedVideo]);

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-black text-white py-24 px-6 md:px-12"
    >
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ----------------------------------------------------
            HEADER
            ---------------------------------------------------- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="w-full md:w-auto text-right md:text-left">
            <span className="text-[#FF3100] font-mono text-xs uppercase tracking-widest mb-4 block">
              Selected Works
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Recent <span className="text-gray-500">Projects</span>
            </h2>
          </div>

          <Link href="/projects">
            <button className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all">
              View All Archive <ArrowUpRight size={16} />
            </button>
          </Link>
        </div>

        {/* VIDEO GRID */}
        {/* Added a check to only render grid if we have videos */}
        {videos.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
            {videos.map((video, index) => (
              <VideoCard
                key={video.id || index}
                video={video}
                index={index}
                onClick={() => setSelectedVideo(video)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            {/* Optional empty state message */}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-16 flex justify-center md:hidden">
          <Link href="/projects">
            <button className="flex items-center gap-2 text-sm uppercase tracking-widest border border-white/20 px-8 py-4 rounded-full hover:bg-[#FF3100] hover:border-[#FF3100] transition-all">
              View All Archive
            </button>
          </Link>
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENT: VIDEO CARD
// ----------------------------------------------------------------------
function VideoCard({
  video,
  index,
  onClick,
}: {
  video: Video;
  index: number;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (video.source === "cloudinary" && videoRef.current) {
      if (isHovered) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, video.source]);

  const youtubeId = video.youtubeId || getYoutubeId(video.url || "");
  const thumbnailUrl =
    video.source === "youtube" && youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
      : "/thumbnails/fallback.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video bg-gray-900 overflow-hidden mb-6">
        {video.source === "youtube" && (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt={video.title || "Video Thumbnail"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
          </div>
        )}

        {video.source === "cloudinary" && video.url && (
          <video
            ref={videoRef}
            src={video.url}
            muted
            playsInline
            loop
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF3100] transition-all duration-300">
            <Play size={24} fill="currentColor" className="text-white ml-1" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start border-t border-white/10 pt-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-[#FF3100] transition-colors">
            {video.title || "Untitled Project"}
          </h3>
          <p className="text-sm text-gray-500 mt-1 font-mono uppercase tracking-wider">
            Cinematography
          </p>
        </div>
        <span className="text-xs font-mono text-gray-600 uppercase tracking-widest mt-1">
          0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENT: MODAL
// ----------------------------------------------------------------------
function VideoModal({
  video,
  onClose,
}: {
  video: Video | null;
  onClose: () => void;
}) {
  if (!video) return null;

  const youtubeId = video.youtubeId || getYoutubeId(video.url || "");

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
          >
            <X size={32} />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10 relative"
          >
            {video.source === "cloudinary" && video.url ? (
              <video
                src={video.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title || "Video"}
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                Video source not found
              </div>
            )}
          </motion.div>

          <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
            <h2 className="text-xl md:text-2xl font-bold text-white/90">
              {video.title}
            </h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
