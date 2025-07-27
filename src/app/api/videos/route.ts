import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Enable body parsing for large video data
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string | null;
    const orientationFromForm = formData.get("orientation") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No video file provided" },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const cloudinaryRes = await uploadVideoToCloudinary(file);

    if (!cloudinaryRes) {
      return NextResponse.json(
        { error: "Cloudinary upload failed" },
        { status: 500 }
      );
    }

    const {
      secure_url,
      public_id,
      orientation: serverOrientation,
    } = cloudinaryRes;

    // Prefer orientation from form if provided, fallback to Cloudinary metadata
    const finalOrientation = orientationFromForm || serverOrientation;

    // Save to DB
    const video = await prisma.video.create({
      data: {
        url: secure_url,
        title: title || "Untitled",
        orientation: finalOrientation,
        publicId: public_id,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Reuse the helper
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
