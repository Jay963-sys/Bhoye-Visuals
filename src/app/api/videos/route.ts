import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { url, title, orientation, publicId } = await req.json();

    if (!url || !publicId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const video = await prisma.video.create({
      data: {
        url,
        title: title || "Untitled",
        orientation: orientation || "landscape",
        publicId,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (err) {
    console.error("DB insert error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
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
