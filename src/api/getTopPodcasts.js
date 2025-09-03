const BASE_ITUNES_URL = "https://itunes.apple.com";

export const getTopPodcasts = async () => {
  const url = `${BASE_ITUNES_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }
    const data = await response.json();

    return data.feed.entry.map((entry) => ({
      id: entry.id.attributes["im:id"],
      name: entry["im:name"].label,
      artist: entry["im:artist"].label,
      image: entry["im:image"][2].label,
    }));
  } catch (error) {
    console.error("Error fetching top podcasts:", error);
    return [];
  }
};
