import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id = Number(params.id);

  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), {
      status: 400,
    });
  }

  try {
    const video = await prisma.video.findUnique({ where: { id } });

    if (!video) {
      return new Response(JSON.stringify({ error: "Video not found" }), {
        status: 404,
      });
    }

    await cloudinary.uploader.destroy(video.publicId, {
      resource_type: "video",
    });

    await prisma.video.delete({ where: { id } });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete video" }), {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id = Number(params.id);
  const { title, orientation } = await req.json();

  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), {
      status: 400,
    });
  }

  try {
    const updatedVideo = await prisma.video.update({
      where: { id },
      data: { title, orientation },
    });

    return new Response(JSON.stringify(updatedVideo), {
      status: 200,
    });
  } catch (error) {
    console.error("Patch error:", error);
    return new Response(JSON.stringify({ error: "Failed to update video" }), {
      status: 500,
    });
  }
}
