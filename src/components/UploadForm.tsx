"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function UploadForm() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Only video files are allowed.");
      return;
    }

    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File too large. Max 500MB allowed.");
      return;
    }

    setUploading(true);
    setProgress(0);
    toast.loading("Uploading...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const xhr = new XMLHttpRequest();
      console.log(
        "🌐 CLOUD NAME:",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      );
      console.log(
        "🌐 UPLOAD PRESET:",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = async () => {
        const res = JSON.parse(xhr.responseText);
        console.log("📦 Cloudinary raw response:", res);
        if (!res.secure_url) {
          console.error("❌ Upload failed (no secure_url)", res);
          throw new Error("Upload failed");
        }

        const orientation = res.height > res.width ? "portrait" : "landscape";

        const metadataRes = await fetch("/api/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: res.secure_url,
            publicId: res.public_id,
            orientation,
            title: file.name.replace(/\.[^/.]+$/, ""),
          }),
        });

        if (!metadataRes.ok) throw new Error("Failed to save metadata");

        setVideoUrl(res.secure_url);
        toast.dismiss();
        toast.success("Upload complete!");
      };

      xhr.onerror = () => {
        toast.dismiss();
        toast.error("Upload failed.");
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err) {
      console.error(err);
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
        {uploading ? `Uploading... ${progress}%` : "Choose Video File"}
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
