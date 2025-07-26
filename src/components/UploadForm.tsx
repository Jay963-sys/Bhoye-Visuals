"use client";

import { useState } from "react";
import { uploadVideoToCloudinary } from "@/utils/cloudinary";
import toast from "react-hot-toast";

export default function UploadForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

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
      const result = await uploadVideoToCloudinary(file);

      if (!result) {
        toast.dismiss();
        toast.error("Upload to Cloudinary failed.");
        setUploading(false);
        return;
      }

      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: result.secure_url,
          title: file.name.replace(/\.[^/.]+$/, ""),

          orientation: "landscape",
          publicId: result.public_id,
        }),
      });

      if (!res.ok) {
        toast.dismiss();
        toast.error("Failed to save to database.");
        setUploading(false);
        return;
      }

      const video = await res.json();
      setVideoUrl(video.url);
      toast.dismiss();
      toast.success("Upload successful!");
    } catch (err) {
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
