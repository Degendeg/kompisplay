import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatusMessage from "../components/StatusMessage";
import { getVideoDetails } from "../lib/youtube";
import type { VideoDetails } from "../types";

export default function VideoPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    if (!videoId) return;

    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    getVideoDetails(videoId)
      .then((details) => {
        if (!isCancelled) setVideo(details);
      })
      .catch(() => {
        if (!isCancelled) {
          setError("Vi kunde inte hämta information om videon just nu.");
        }
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [videoId]);

  if (!videoId) {
    return <StatusMessage emoji="🙈" title="Videon saknas" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-4 py-2 font-display text-2xl font-semibold text-forest transition hover:bg-forest/10 dark:bg-night-card dark:text-sun"
      >
        <ArrowLeft size={16} />
        Tillbaka
      </Link>

      <div className="flex justify-end">
        <button
          onClick={() => setIframeKey((k) => k + 1)}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest shadow transition hover:bg-forest/10 dark:bg-night-card dark:text-sun"
        >
          🔄 Ladda om videon
        </button>
      </div>
      <div className="aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-md">
        <iframe
          key={`${videoId}-${iframeKey}`}
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
          title={video?.title ?? "YouTube-video"}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {isLoading ? (
        <StatusMessage emoji="🎬" title="Hämtar videoinformation..." />
      ) : error ? (
        <StatusMessage emoji="😕" title="Hoppsan!" description={error} />
      ) : video ? (
        <div className="rounded-3xl bg-white p-4 dark:bg-night-card">
          <h1 className="font-display text-lg font-bold text-ink dark:text-cream sm:text-xl">
            {video.title}
          </h1>
          <p className="mt-1 text-sm font-semibold text-forest dark:text-sun">
            {video.channelTitle}
          </p>
          <p className="mt-3 whitespace-pre-line break-words text-sm text-ink/70 dark:text-cream/70">
            {video.description || "Ingen beskrivning tillgänglig."}
          </p>
        </div>
      ) : null}
    </div>
  );
}
