import type { VideoSummary } from "../types";
import VideoCard from "./VideoCard";

interface VideoGridProps {
  videos: VideoSummary[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
