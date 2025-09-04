import { buildItunesUrl, fetchWithFallback } from "./utils";

export const getTopPodcasts = async () => {
  const url = buildItunesUrl("/us/rss/toppodcasts/limit=100/genre=1310/json");

  try {
    const data = await fetchWithFallback(url);

    if (!data?.feed?.entry) {
      console.error("No podcasts found in response");
      return [];
    }

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
