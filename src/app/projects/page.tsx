"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

const filterOptions = ["all", "landscape", "portrait"] as const;
type FilterOption = (typeof filterOptions)[number];

interface Video {
  id: number;
  title: string;
  url?: string;
  youtubeId?: string;
  orientation?: string;
  source: "cloudinary" | "youtube";
}

export default function ProjectsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [filter, setFilter] = useState<FilterOption>("all");

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    }

    fetchVideos();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  const filteredVideos =
    filter === "all" ? videos : videos.filter((v) => v.orientation === filter);

  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-tight 
                       bg-gradient-to-r from-[#FF3100] to-[#C10801] bg-clip-text text-transparent"
        >
          Featured Projects
        </h1>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {filterOptions.map((type) => {
            const isActive = filter === type;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border uppercase tracking-wider
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#FF3100] to-[#C10801] text-white border-transparent shadow-[0_0_12px_#FF3100aa]"
                      : "bg-[#1a1a1a] text-gray-300 border-gray-600 hover:border-[#FF3100] hover:text-white hover:shadow-[0_0_10px_#FF3100aa]"
                  }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            <span className="bg-gradient-to-r from-[#FF3100] to-[#C10801] bg-clip-text text-transparent">
              No videos available.
            </span>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => {
              // Ensure each container matches orientation
              const aspectClass =
                video.orientation === "portrait"
                  ? "aspect-[9/16]"
                  : "aspect-video";

              return (
                <div
                  key={video.id}
                  className={`relative ${aspectClass} rounded-2xl overflow-hidden`}
                >
                  <ProjectCard {...video} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
