export async function uploadVideoToCloudinary(
  file: File
): Promise<{
  secure_url: string;
  public_id: string;
  orientation: string;
} | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "portfolio_upload");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/djzdo5x3d/video/upload`,
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
