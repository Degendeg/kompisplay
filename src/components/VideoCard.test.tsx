import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import VideoCard from "./VideoCard";

describe("VideoCard", () => {
  it("visar titel och kanalnamn, och länkar till videosidan", () => {
    render(
      <MemoryRouter>
        <VideoCard
          video={{
            id: "xyz789",
            title: "Sagan om den lilla igelkotten",
            channelTitle: "Sagostunden",
            thumbnailUrl: "https://img.example/thumb.jpg",
            publishedAt: "2024-05-01T00:00:00Z",
          }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Sagan om den lilla igelkotten")).toBeInTheDocument();
    expect(screen.getByText("Sagostunden")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/video/xyz789");
  });
});
