"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Stats {
  totalCount: number;
  estimatedStorageMB: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/videos/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch admin stats");
        console.error("Failed to fetch stats:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-[#ffffff0a] backdrop-blur-sm border border-[#333] text-white shadow-md shadow-[#ffffff0a] p-6 rounded-2xl animate-pulse">
        <div className="h-6 w-40 bg-gray-700 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-60 bg-gray-800 rounded" />
          <div className="h-4 w-44 bg-gray-800 rounded" />
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-[#ffffff0a] backdrop-blur-sm border border-[#333] text-white shadow-md shadow-[#FF310020] p-6 rounded-2xl">
      <h2 className="text-2xl font-bold text-[#FF3100] mb-3 tracking-wide">
        Stats Overview
      </h2>
      <div className="space-y-2 text-[#CCCCCC] text-base leading-relaxed">
        <p>
          Total Videos:{" "}
          <span className="text-white font-semibold">
            {stats.totalCount ?? 0}
          </span>
        </p>
        <p>
          Estimated Storage:{" "}
          <span className="text-white font-semibold">
            {stats.estimatedStorageMB ?? 0} MB
          </span>
        </p>
      </div>
    </div>
  );
}
