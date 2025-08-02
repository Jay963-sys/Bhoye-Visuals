import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, title, orientation, publicId } = body;

    if (!url || !publicId || !orientation) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const video = await prisma.video.create({
      data: {
        url,
        title: title || "Untitled",
        orientation,
        publicId,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (err) {
    console.error("Metadata save error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

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
