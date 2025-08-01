import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust if needed

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { uploadedAt: "desc" },
      take: 4,
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("[API] Error fetching latest videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
