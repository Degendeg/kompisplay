import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { searchVideos, YoutubeApiError, YoutubeConfigError } from "./youtube";

describe("searchVideos", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("VITE_YOUTUBE_API_KEY", "test-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("skickar med SafeSearch strikt och svenska språk/regionparametrar", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        items: [
          {
            id: { videoId: "abc123" },
            snippet: {
              title: "En saga om skogen",
              channelTitle: "Sagostunden",
              publishedAt: "2024-01-01T00:00:00Z",
              thumbnails: { medium: { url: "https://img.example/thumb.jpg" } },
            },
          },
        ],
        nextPageToken: "TOKEN",
      }),
    });

    const result = await searchVideos("sagor för barn");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain("safeSearch=strict");
    expect(calledUrl).toContain("relevanceLanguage=sv");
    expect(calledUrl).toContain("regionCode=SE");
    expect(calledUrl).toContain("type=video");

    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({
      id: "abc123",
      title: "En saga om skogen",
      channelTitle: "Sagostunden",
    });
    expect(result.nextPageToken).toBe("TOKEN");
  });

  it("kastar YoutubeApiError om anropet misslyckas", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 403 });

    await expect(searchVideos("test")).rejects.toThrow(YoutubeApiError);
  });

  it("kastar YoutubeConfigError om API-nyckeln saknas", async () => {
    vi.stubEnv("VITE_YOUTUBE_API_KEY", "");

    await expect(searchVideos("test")).rejects.toThrow(YoutubeConfigError);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
