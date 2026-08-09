import type { VideoSummary } from "../types";

const FAVORITES_KEY = "kompisplay-favorites";

export function getFavorites(): VideoSummary[] {
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");
    } catch {
        return [];
    }
}

export function isFavorite(videoId: string): boolean {
    return getFavorites().some((video) => video.id === videoId);
}

export function toggleFavorite(video: VideoSummary): boolean {
    const favorites = getFavorites();
    const exists = favorites.some((item) => item.id === video.id);

    const updated = exists
        ? favorites.filter((item) => item.id !== video.id)
        : [...favorites, video];

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

    return !exists;
}