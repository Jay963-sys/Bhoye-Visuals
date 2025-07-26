import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  try {
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    await cloudinary.uploader.destroy(video.publicId, {
      resource_type: "video",
    });

    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);
  const { title, orientation } = await req.json();

  try {
    const updatedVideo = await prisma.video.update({
      where: { id },
      data: {
        title,
        orientation,
      },
    });

    return NextResponse.json(updatedVideo);
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json(
      { error: "Failed to update video" },
      { status: 500 }
    );
  }
}
