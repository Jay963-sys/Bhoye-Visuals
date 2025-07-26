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
      <div className="bg-white/5 p-6 rounded-xl border border-neutral-700 text-white shadow animate-pulse">
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
    <div className="bg-white/5 p-6 rounded-xl border border-neutral-700 text-white shadow">
      <h2 className="text-xl font-semibold text-accent mb-3">Stats Overview</h2>
      <div className="space-y-2 text-gray-300">
        <p>
          Total Videos:{" "}
          <span className="text-white font-medium">
            {stats.totalCount ?? 0}
          </span>
        </p>
        <p>
          Estimated Storage:{" "}
          <span className="text-white font-medium">
            {stats.estimatedStorageMB ?? 0} MB
          </span>
        </p>
      </div>
    </div>
  );
}
