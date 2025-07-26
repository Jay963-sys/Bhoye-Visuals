import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const videos = await prisma.video.findMany();

    const totalCount = videos.length;
    const estimatedStorageMB = totalCount * 20;

    return NextResponse.json({
      totalCount,
      estimatedStorageMB,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
