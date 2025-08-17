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
    <main className="min-h-screen bg-black text-white px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 space-y-20">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-wide text-white drop-shadow-sm">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your uploads, content and statistics
          </p>
        </div>

        {/* Admin Stats */}
        <section className="bg-white/5 rounded-2xl shadow-lg p-6 backdrop-blur-sm border border-white/10">
          <AdminStats />
        </section>

        {/* Upload Form */}
        <section className="bg-white/5 rounded-2xl shadow-lg p-6 backdrop-blur-sm border border-white/10">
          <UploadForm />
        </section>

        {/* Video List */}
        <section className="bg-white/5 rounded-2xl shadow-lg p-6 backdrop-blur-sm border border-white/10">
          <VideoListAdmin />
        </section>
      </div>
    </main>
  );
}
