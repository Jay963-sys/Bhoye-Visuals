"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type Source = "cloudinary" | "youtube";

export default function UploadForm() {
  const [source, setSource] = useState<Source>("cloudinary");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  function extractYoutubeId(url: string) {
    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.replace("/", "");
      }

      if (parsed.searchParams.has("v")) {
        return parsed.searchParams.get("v");
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/shorts/")[1];
      }

      return null;
    } catch {
      return null;
    }
  }

  const handleYoutubeSubmit = async () => {
    const youtubeId = extractYoutubeId(youtubeUrl);

    if (!youtubeId) {
      toast.error("Invalid YouTube URL");
      return;
    }

    setUploading(true);
    toast.loading("Saving YouTube video...");

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "youtube",
          youtubeId,
          title: "YouTube Video",
        }),
      });

      if (!res.ok) throw new Error();

      toast.dismiss();
      toast.success("YouTube video added!");
      setYoutubeUrl("");
    } catch {
      toast.dismiss();
      toast.error("Failed to add YouTube video");
    } finally {
      setUploading(false);
    }
  };

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

        if (!res.secure_url) throw new Error();

        const orientation = res.height > res.width ? "portrait" : "landscape";

        const metadataRes = await fetch("/api/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "cloudinary",
            url: res.secure_url,
            publicId: res.public_id,
            orientation,
            title: file.name.replace(/\.[^/.]+$/, ""),
          }),
        });

        if (!metadataRes.ok) throw new Error();

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
    } catch {
      toast.dismiss();
      toast.error("Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/5 p-6 rounded-xl border border-neutral-700 shadow text-white max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#FF3100]">Add New Video</h2>

      {/* SOURCE TOGGLE */}
      <div className="flex gap-3 mb-6">
        {(["cloudinary", "youtube"] as Source[]).map((type) => (
          <button
            key={type}
            onClick={() => setSource(type)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition
              ${
                source === type
                  ? "bg-[#FF3100] text-black"
                  : "bg-neutral-700 text-white"
              }`}
          >
            {type === "cloudinary" ? "Upload Video" : "YouTube Link"}
          </button>
        ))}
      </div>

      {/* CLOUDINARY */}
      {source === "cloudinary" && (
        <>
          <label
            htmlFor="video-upload"
            className="block cursor-pointer px-6 py-3 text-center bg-[#FF3100] text-black font-medium rounded hover:bg-white transition"
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
        </>
      )}

      {/* YOUTUBE */}
      {source === "youtube" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Paste YouTube URL"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full p-3 bg-black border border-neutral-700 rounded-lg"
          />

          <button
            onClick={handleYoutubeSubmit}
            disabled={uploading}
            className="w-full py-3 rounded-lg bg-[#FF3100] text-black font-semibold hover:bg-white transition"
          >
            Add YouTube Video
          </button>
        </div>
      )}
    </div>
  );
}
