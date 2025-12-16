import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

function normalizeYoutubeId(id: string) {
  return id.trim().split("?")[0].split("&")[0];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      source,
      url,
      title,
      orientation,
      publicId,
      youtubeId: rawYoutubeId,
    } = body;

    const youtubeId =
      source === "youtube" && typeof rawYoutubeId === "string"
        ? normalizeYoutubeId(rawYoutubeId)
        : null;

    if (
      !source ||
      (source === "cloudinary" && (!url || !publicId || !orientation)) ||
      (source === "youtube" && !youtubeId)
    ) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const video = await prisma.video.create({
      data: {
        title: title || "Untitled",
        orientation: orientation || null,
        source,
        url: source === "cloudinary" ? url : null,
        publicId: source === "cloudinary" ? publicId : null,
        youtubeId,
      },
    });

    if (source === "youtube" && (!youtubeId || youtubeId.length !== 11)) {
      return NextResponse.json(
        { error: "Invalid YouTube ID" },
        { status: 400 }
      );
    }

    return NextResponse.json(video, { status: 201 });
  } catch (err) {
    console.error("Metadata save error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Optional helper if you still need Cloudinary uploads
async function uploadVideoToCloudinary(file: File): Promise<{
  secure_url: string;
  public_id: string;
  orientation: string;
} | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "portfolio_upload");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Cloudinary error:", data);
      return null;
    }

    const width = data.width;
    const height = data.height;
    const orientation = height > width ? "portrait" : "landscape";

    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      orientation,
    };
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return null;
  }
}

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { uploadedAt: "desc" },
    });

    return NextResponse.json(videos);
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
