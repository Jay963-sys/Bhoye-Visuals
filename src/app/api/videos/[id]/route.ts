import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

interface Context {
  params: {
    id: string;
  };
}

export async function DELETE(req: NextRequest, context: Context) {
  const id = Number(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const video = await prisma.video.findUnique({ where: { id } });

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    if (video.publicId) {
      await cloudinary.uploader.destroy(video.publicId, {
        resource_type: "video",
      });
    }

    await prisma.video.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: Context) {
  const id = Number(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const { title, orientation } = await req.json();

    const updatedVideo = await prisma.video.update({
      where: { id },
      data: { title, orientation },
    });

    return NextResponse.json(updatedVideo);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update video" },
      { status: 500 }
    );
  }
}
