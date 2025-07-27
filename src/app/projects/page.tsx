"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

// ✅ Define strict filter options and type
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
    <main className="min-h-screen bg-background text-foreground px-4 pt-20 pb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-accent mb-6">
          My Work
        </h1>

        {/* ✅ Filter Bar */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {filterOptions.map((type) => {
            const isActive = filter === type;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border 
                ${
                  isActive
                    ? "bg-accent text-black border-accent shadow-lg brightness-110"
                    : "bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            );
          })}
        </div>

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
