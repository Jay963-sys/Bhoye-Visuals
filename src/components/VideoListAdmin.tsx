"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Video {
  id: number;
  title: string;
  url: string;
  orientation: string;
  uploadedAt: string;
}

export default function VideoListAdmin() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editOrientation, setEditOrientation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [orientationFilter, setOrientationFilter] = useState("all");

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch videos");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this video?");
    if (!confirmed) return;

    toast.loading("Deleting video...");
    const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });

    toast.dismiss();
    if (res.ok) {
      setVideos((prev) => prev.filter((v) => v.id !== id));
      toast.success("Video deleted");
    } else {
      toast.error("Failed to delete video");
    }
  };

  const handleEdit = (video: Video) => {
    setEditingId(video.id);
    setEditTitle(video.title);
    setEditOrientation(video.orientation);
  };

  const saveEdit = async (id: number) => {
    toast.loading("Saving changes...");
    const res = await fetch(`/api/videos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, orientation: editOrientation }),
    });

    toast.dismiss();
    if (res.ok) {
      const updated = await res.json();
      setVideos((prev) =>
        prev.map((v) => (v.id === id ? { ...v, ...updated } : v))
      );
      setEditingId(null);
      toast.success("Video updated!");
    } else {
      toast.error("Failed to save changes");
    }
  };

  const filteredVideos = videos.filter((video) => {
    const matchTitle = video.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchOrientation =
      orientationFilter === "all" || video.orientation === orientationFilter;
    return matchTitle && matchOrientation;
  });

  if (loading) return <p className="text-gray-500">Loading videos...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-accent">Uploaded Videos</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 bg-black border border-gray-600 rounded text-white"
        />
        <select
          value={orientationFilter}
          onChange={(e) => setOrientationFilter(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 bg-black border border-gray-600 rounded text-white"
        >
          <option value="all">All Orientations</option>
          <option value="landscape">Landscape</option>
          <option value="portrait">Portrait</option>
        </select>
      </div>

      {/* Video Cards */}
      {filteredVideos.length === 0 ? (
        <p className="text-gray-400">No videos match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white/5 p-4 rounded-lg shadow">
              <video
                src={video.url}
                controls
                className="w-full h-48 object-cover rounded mb-3"
              />

              {editingId === video.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-2 py-1 bg-black border border-neutral-700 rounded text-white mb-2"
                  />
                  <select
                    value={editOrientation}
                    onChange={(e) => setEditOrientation(e.target.value)}
                    className="w-full px-2 py-1 bg-black border border-neutral-700 rounded text-white mb-2"
                  >
                    <option value="landscape">Landscape</option>
                    <option value="portrait">Portrait</option>
                  </select>
                  <div className="flex gap-4 text-sm mt-2">
                    <button
                      onClick={() => saveEdit(video.id)}
                      className="text-green-400 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-400 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-white font-medium truncate">
                    {video.title}
                  </p>
                  <p className="text-sm text-gray-400 capitalize">
                    Orientation:{" "}
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        video.orientation === "portrait"
                          ? "bg-purple-600"
                          : "bg-blue-600"
                      } text-white`}
                    >
                      {video.orientation}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Uploaded: {new Date(video.uploadedAt).toLocaleString()}
                  </p>
                  <div className="flex gap-4 mt-3 text-sm">
                    <button
                      onClick={() => handleEdit(video)}
                      className="text-yellow-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
