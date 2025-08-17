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
      <div className="bg-white/5 backdrop-blur-sm border border-black text-white shadow-md shadow-black/10 p-6 rounded-2xl animate-pulse">
        <div className="h-6 w-40 bg-black/30 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-60 bg-black/40 rounded" />
          <div className="h-4 w-44 bg-black/40 rounded" />
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-black text-white shadow-md shadow-black/20 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">
        Stats Overview
      </h2>
      <div className="space-y-2 text-gray-300 text-base leading-relaxed">
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
