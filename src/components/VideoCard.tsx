import { Link } from "react-router-dom";
import type { VideoSummary } from "../types";

interface VideoCardProps {
  video: VideoSummary;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Link
      to={`/video/${video.id}`}
      className="card-pop group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:bg-night-card"
    >
      <div className="aspect-video w-full overflow-hidden bg-sky/20">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-ink dark:text-cream">
          {video.title}
        </h3>
        <p className="text-xs font-semibold text-forest dark:text-sun">{video.channelTitle}</p>
      </div>
    </Link>
  );
}
