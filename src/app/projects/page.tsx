"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

const filterOptions = ["all", "landscape", "portrait"] as const;
type FilterOption = (typeof filterOptions)[number];

interface Video {
  id: number;
  title: string;
  url: string;
  orientation: string;
}

export default function ProjectsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filter, setFilter] = useState<FilterOption>("all");

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch("/api/videos", { cache: "no-store" });
      const data = await res.json();
      setVideos(data);
    }
    fetchVideos();
  }, []);

  const filteredVideos =
    filter === "all" ? videos : videos.filter((v) => v.orientation === filter);

  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ⚪ Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-10 tracking-tight">
          Featured Projects
        </h1>

        {/* ⚪ Filter Buttons */}
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
                      ? "bg-white text-black border-white shadow-lg shadow-white/40"
                      : "bg-[#1a1a1a] text-gray-300 border-gray-600 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* ⚪ Video Grid */}
        {filteredVideos.length === 0 ? (
          <p className="text-gray-500 text-center">No videos available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <ProjectCard key={video.id} {...video} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
