"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function UploadForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const getVideoOrientation = (
    file: File
  ): Promise<"landscape" | "portrait"> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        const orientation =
          video.videoWidth < video.videoHeight ? "portrait" : "landscape";
        resolve(orientation);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file.");
      return;
    }

    setUploading(true);
    toast.loading("Uploading video...");

    try {
      const orientation = await getVideoOrientation(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name.replace(/\.[^/.]+$/, ""));
      formData.append("orientation", orientation); // ✅ Include orientation

      const res = await fetch("/api/videos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.dismiss();
        toast.error("Failed to upload video.");
        setUploading(false);
        return;
      }

      const video = await res.json();
      setVideoUrl(video.url);
      toast.dismiss();
      toast.success("Upload successful!");

      e.target.value = ""; // ✅ Reset file input
    } catch (err) {
      console.error("Upload error:", err);
      toast.dismiss();
      toast.error("Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/5 p-6 rounded-xl border border-neutral-700 shadow text-white max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-accent">Upload New Video</h2>

      <label
        htmlFor="video-upload"
        className="block cursor-pointer px-6 py-3 text-center bg-accent text-black font-medium rounded hover:bg-white transition"
      >
        {uploading ? "Uploading..." : "Choose Video File"}
      </label>

      <input
        id="video-upload"
        type="file"
        accept="video/*"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
      />

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          className="mt-6 w-full rounded-lg border border-neutral-700"
        />
      )}
    </div>
  );
}
