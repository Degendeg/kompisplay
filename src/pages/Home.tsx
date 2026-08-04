import { useEffect, useState } from "react";
import CategoryChips from "../components/CategoryChips";
import SearchBar from "../components/SearchBar";
import StatusMessage from "../components/StatusMessage";
import VideoGrid from "../components/VideoGrid";
import { DEFAULT_CATEGORY } from "../lib/categories";
import { searchVideos, YoutubeConfigError } from "../lib/youtube";
import type { Category, VideoSummary } from "../types";

export default function Home() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(
    DEFAULT_CATEGORY.id
  );
  const [videos, setVideos] = useState<VideoSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runSearch(query: string, categoryId?: string) {
    setIsLoading(true);
    setError(null);
    setActiveCategoryId(categoryId);
    try {
      const result = await searchVideos(query);
      setVideos(result.items);
    } catch (err) {
      if (err instanceof YoutubeConfigError) {
        setError(err.message);
      } else {
        setError("Något gick fel när vi hämtade videor. Försök igen om en stund.");
      }
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    runSearch(DEFAULT_CATEGORY.query, DEFAULT_CATEGORY.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCategorySelect(category: Category) {
    runSearch(category.query, category.id);
  }

  function handleSearch(query: string) {
    runSearch(query, undefined);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-forest dark:text-sun sm:text-3xl">
          Hej! 👋
        </h1>
        <p className="mt-1 text-sm text-ink/70 dark:text-cream/70">
          Alla videor här är på svenska och filtrerade med SafeSearch strikt.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />
      <CategoryChips activeCategoryId={activeCategoryId} onSelect={handleCategorySelect} />

      {isLoading ? (
        <StatusMessage emoji="🎈" title="Letar efter roliga videor..." />
      ) : error ? (
        <StatusMessage emoji="😕" title="Hoppsan!" description={error} />
      ) : videos.length === 0 ? (
        <StatusMessage
          emoji="🔍"
          title="Vi hittade inga videor"
          description="Prova att söka på något annat, till exempel djur eller sagor."
        />
      ) : (
        <VideoGrid videos={videos} />
      )}
    </div>
  );
}
