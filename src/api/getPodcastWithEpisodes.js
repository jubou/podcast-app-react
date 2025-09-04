import { buildItunesUrl, fetchWithFallback } from "./utils";

export const getPodcastWithEpisodes = async (podcastId, limit = 100) => {
  const url = buildItunesUrl(
    `/lookup?id=${podcastId}&entity=podcastEpisode&limit=${limit}`,
  );

  try {
    const data = await fetchWithFallback(url);

    if (!data?.results || data.results.length === 0) {
      throw new Error(`Podcast with ID ${podcastId} not found`);
    }

    const podcastData = data.results[0];
    const episodesData = data.results.slice(1);

    const podcast = {
      id: podcastData?.collectionId,
      name:
        podcastData?.collectionName ||
        podcastData?.trackName ||
        "Unknown Podcast",
      artist: podcastData?.artistName || "Unknown Artist",
      image:
        podcastData?.artworkUrl600 ||
        podcastData?.artworkUrl100 ||
        "https://picsum.photos/170",
      description: "",
      genres: podcastData?.genres || [],
      trackCount: podcastData?.trackCount || 0,
    };

    const episodes =
      episodesData?.map((episode) => ({
        id: episode?.trackId,
        title: episode?.trackName || "Unknown Episode",
        description: episode?.description || episode?.shortDescription || "",
        releaseDate: episode?.releaseDate,
        duration: episode?.trackTimeMillis,
        audioUrl: episode?.episodeUrl || "",
      })) || [];

    return { podcast, episodes };
  } catch (error) {
    console.error("Error fetching podcast with episodes:", error.message);
    throw error;
  }
};
