import ProjectCard from "@/components/ProjectCard";

interface Video {
  id: number;
  title: string;
  url: string;
  orientation: string;
}

async function getVideos(): Promise<Video[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch videos");

  return res.json();
}

export default async function ProjectsPage() {
  const videos = await getVideos();
  const landscapeVideos = videos.filter((v) => v.orientation === "landscape");

  return (
    <main className="min-h-screen bg-background text-foreground px-4 pt-20 pb-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-accent mb-10">
          My Work
        </h1>

        {landscapeVideos.length === 0 ? (
          <p className="text-gray-500 text-center">
            No landscape videos available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {landscapeVideos.map((video) => (
              <ProjectCard
                key={video.id}
                title={video.title}
                url={video.url}
                orientation={video.orientation}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
