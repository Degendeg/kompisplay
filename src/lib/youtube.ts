import type { SearchResult, VideoDetails, VideoSummary } from "../types";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

export class YoutubeConfigError extends Error { }
export class YoutubeApiError extends Error { }

/**
 * Läser API-nyckeln vid varje anrop (inte vid modul-load) så att den kan
 * stubbas i tester och alltid speglar senaste miljövariabeln.
 */
function getApiKey(): string {
  const key = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!key) {
    throw new YoutubeConfigError(
      "Ingen YouTube API-nyckel hittades. Lägg till VITE_YOUTUBE_API_KEY i din .env-fil (se .env.example)."
    );
  }
  return key;
}

interface RawThumbnails {
  medium?: { url: string };
  high?: { url: string };
  default?: { url: string };
}

interface RawSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: RawThumbnails;
  };
}

interface RawVideoItem {
  id: string;
  snippet: RawSearchItem["snippet"] & { description: string };
}

function pickThumbnail(thumbnails: RawThumbnails): string {
  return (
    thumbnails.medium?.url ?? thumbnails.high?.url ?? thumbnails.default?.url ?? ""
  );
}

function mapSearchItem(item: RawSearchItem): VideoSummary {
  return {
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    thumbnailUrl: pickThumbnail(item.snippet.thumbnails),
  };
}

async function callYoutube<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}/${path}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new YoutubeApiError(
      `YouTube-anropet misslyckades (status ${response.status}). Kontrollera din API-nyckel och kvot.`
    );
  }
  return (await response.json()) as T;
}

/**
 * Söker efter videor på svenska med SafeSearch satt till "strict".
 *
 * Resultat cachelagras lokalt i 24 timmar för att minska antalet API-anrop
 * och spara YouTube API quota.
 *
 * OBS för föräldrar: relevanceLanguage/regionCode är hint till YouTube, inte
 * en absolut garanti att varje video är på svenska – kombinera med
 * medveten vägledning tillsammans med barnet.
 */
export async function searchVideos(
  query: string,
  pageToken?: string
): Promise<SearchResult> {
  const cacheKey = `youtube:${query.toLowerCase()}:${pageToken ?? ""}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const { timestamp, result } = JSON.parse(cached);

    // 24 timmar
    if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
      return result;
    }

    localStorage.removeItem(cacheKey);
  }

  const params: Record<string, string> = {
    part: "snippet",
    type: "video",
    maxResults: "3",
    safeSearch: "strict",
    relevanceLanguage: "sv",
    regionCode: "SE",
    q: query,
    key: getApiKey(),
  };

  if (pageToken) params.pageToken = pageToken;

  const data = await callYoutube<{
    items: RawSearchItem[];
    nextPageToken?: string;
  }>("search", params);

  const result: SearchResult = {
    items: data.items.map(mapSearchItem),
    nextPageToken: data.nextPageToken,
  };

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      timestamp: Date.now(),
      result,
    })
  );

  return result;
}

export async function getVideoDetails(videoId: string): Promise<VideoDetails> {
  const data = await callYoutube<{ items: RawVideoItem[] }>("videos", {
    part: "snippet",
    id: videoId,
    key: getApiKey(),
  });

  const item = data.items[0];
  if (!item) {
    throw new YoutubeApiError("Videon kunde inte hittas.");
  }

  return {
    id: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    thumbnailUrl: pickThumbnail(item.snippet.thumbnails),
    description: item.snippet.description,
  };
}
