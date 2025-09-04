import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getPodcastWithEpisodes } from "../../api/getPodcastWithEpisodes";
import styles from "./PodcastEpisodesList.module.scss";

export default function PodcastEpisodesList({ podcastId }) {
  const { data: podcastData, isLoading } = useQuery({
    queryKey: ["podcast-with-episodes", podcastId],
    queryFn: () => getPodcastWithEpisodes(podcastId),
    enabled: !!podcastId,
  });

  if (isLoading || !podcastData) {
    return null;
  }

  const episodes = podcastData?.episodes || [];

  if (!episodes.length) {
    return <div className={styles.noEpisodes}>No episodes found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.episodesSection}>
        <h3 className={styles.episodesHeader}>Episodes: {episodes.length}</h3>
        <div className={styles.episodesTable}>
          <div className={styles.tableHeader}>
            <span>Title</span>
            <span>Date</span>
            <span>Duration</span>
          </div>
          {episodes.map((episode) => (
            <Link
              key={episode.id}
              to="/podcast/$podcastId/episode/$episodeId"
              params={{ podcastId, episodeId: episode.id.toString() }}
              className={styles.episodeRow}
            >
              <span className={styles.episodeTitle}>{episode.title}</span>
              <span className={styles.episodeDate}>
                {episode.releaseDate
                  ? new Date(episode.releaseDate).toLocaleDateString()
                  : "Unknown"}
              </span>
              <span className={styles.episodeDuration}>
                {episode.duration
                  ? `${Math.floor(episode.duration / 60000)}:${String(
                      Math.floor((episode.duration % 60000) / 1000),
                    ).padStart(2, "0")}`
                  : "Unknown"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
