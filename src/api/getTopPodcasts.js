import { buildItunesUrl } from "./utils";

export const getTopPodcasts = async () => {
  const url = buildItunesUrl("/us/rss/toppodcasts/limit=100/genre=1310/json");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }
    const data = await response.json();

    return (
      data.feed?.entry?.map((entry) => ({
        id: entry.id?.attributes?.["im:id"],
        name: entry["im:name"]?.label || "Unknown Podcast",
        artist: entry["im:artist"]?.label || "Unknown Artist",
        image: entry["im:image"]?.[2]?.label || "https://picsum.photos/170",
      })) || []
    );
  } catch (error) {
    console.error("Error fetching top podcasts:", error);
    return [];
  }
};
