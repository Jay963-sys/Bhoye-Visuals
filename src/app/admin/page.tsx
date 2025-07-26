import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UploadForm from "@/components/UploadForm";
import VideoListAdmin from "@/components/VideoListAdmin";
import AdminStats from "@/components/AdminStats";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (role !== "admin") redirect("/");

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-accent">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your video uploads</p>
        </div>

        <AdminStats />
        <UploadForm />
        <VideoListAdmin />
      </div>
    </main>
  );
}
