"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

interface Video {
  id: number;
  title: string;
  url: string;
  orientation: string;
}

export default function ProjectsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filter, setFilter] = useState<"all" | "landscape" | "portrait">("all");

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

        {/* Filter Bar */}
        <div className="flex justify-center overflow-x-auto gap-3 mb-10 px-2 scrollbar-hide">
          {["all", "landscape", "portrait"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out border ${
                filter === type
                  ? "bg-accent text-black border-accent shadow-md"
                  : "bg-gray-900 border-gray-700 text-white hover:bg-gray-800 hover:border-gray-500"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
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
