"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowUpRight, Loader2 } from "lucide-react";

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------
interface Video {
  id: number;
  title: string;
  url?: string;
  youtubeId?: string;
  orientation?: "landscape" | "portrait" | string;
  source: "cloudinary" | "youtube";
}

const filterOptions = ["all", "landscape", "portrait"] as const;
type FilterOption = (typeof filterOptions)[number];

// Helper for YouTube Thumbnails
const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function ProjectsPage() {
  // Initialize with empty array to prevent map errors immediately
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterOption>("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // 1. FETCH VIDEOS
  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();

        // 🛡️ SAFETY CHECK: Ensure data is actually an array before setting state
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error("API returned invalid data format:", data);
          setVideos([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setVideos([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  // 2. MODAL & SCROLL LOCK
  useEffect(() => {
    if (selectedVideo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedVideo]);

  // 3. FILTER LOGIC (Safe Access)
  // We ensure videos is always an array, so .filter will work.
  const filteredVideos = (Array.isArray(videos) ? videos : []).filter((v) => {
    if (filter === "all") return true;
    return v.orientation === filter;
  });

  return (
    <main className="min-h-screen bg-black text-white pt-45 md:pt-52 pb-24 px-6 md:px-12 relative overflow-x-hidden w-full">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay pointer-events-none" />

      {/* -------------------------------------------------------
          HEADER
          ------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10 w-full">
        <div>
          <span className="text-[#FF3100] font-mono text-xs uppercase tracking-widest mb-4 block">
            The Archive
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Selected <br /> <span className="text-white/50">Works</span>
          </h1>
        </div>

        <p className="max-w-xs text-gray-400 text-sm leading-relaxed">
          A complete collection of visual stories, commercial campaigns, and
          intimate moments captured across the globe.
        </p>
      </div>

      {/* -------------------------------------------------------
          FILTER BAR (Sticky)
          ------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto mb-12 sticky top-28 md:top-32 z-30 pointer-events-none w-full">
        <div className="flex flex-wrap gap-2 pointer-events-auto">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`relative px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 backdrop-blur-md border
                ${
                  filter === opt
                    ? "text-black border-white bg-white"
                    : "text-white/60 border-white/10 bg-black/50 hover:text-white hover:border-white/40"
                }
              `}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------
          THE GRID
          ------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#FF3100]" size={40} />
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-mono text-sm uppercase tracking-widest">
            No videos found in this category.
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video) => (
                <ProjectCard
                  key={video.id}
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* -------------------------------------------------------
          VIDEO MODAL
          ------------------------------------------------------- */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </main>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENT: PROJECT CARD
// ----------------------------------------------------------------------
function ProjectCard({
  video,
  onClick,
}: {
  video: Video;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const aspectClass =
    video.orientation === "portrait" ? "aspect-[9/16]" : "aspect-video";

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

  const youtubeId =
    video.youtubeId || (video.url ? getYoutubeId(video.url) : null);
  const thumbnailUrl =
    video.source === "youtube" && youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
      : "/thumbnails/fallback.jpg";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer mb-8 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className={`relative ${aspectClass} bg-neutral-900 rounded-lg overflow-hidden mb-4 border border-white/10 group-hover:border-[#FF3100]/50 transition-colors w-full`}
      >
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

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#FF3100] flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 delay-75 shadow-lg shadow-[#FF3100]/40">
            <Play size={24} fill="currentColor" className="text-black ml-1" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-start border-t border-white/10 pt-4">
        <div className="max-w-[85%]">
          <h3 className="text-lg font-bold group-hover:text-[#FF3100] transition-colors leading-tight truncate">
            {video.title || "Untitled Project"}
          </h3>
          <p className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-wider">
            {video.orientation || "Cinematic"}
          </p>
        </div>
        <ArrowUpRight
          className="text-gray-600 group-hover:text-white transition-colors shrink-0"
          size={18}
        />
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

  const youtubeId =
    video.youtubeId || (video.url ? getYoutubeId(video.url) : null);
  const isPortrait = video.orientation === "portrait";

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
            className={`w-full ${isPortrait ? "max-w-md aspect-[9/16]" : "max-w-6xl aspect-video"} bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10 relative`}
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
