export interface VideoSummary {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export interface SearchResult {
  items: VideoSummary[];
  nextPageToken?: string;
}

export interface VideoDetails extends VideoSummary {
  description: string;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
  query: string;
}
