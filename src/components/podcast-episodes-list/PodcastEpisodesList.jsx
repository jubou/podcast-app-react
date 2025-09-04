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

  const episodes = podcastData?.episodes || [];

  if (isLoading) {
    return <div className={styles.loading}>Loading episodes...</div>;
  }

  if (!episodes.length) {
    return <div className={styles.noEpisodes}>No episodes found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.episodesSection}>
        <h3 className={styles.episodesHeader}>Episodes: {episodes.length}</h3>

        <div className={styles.episodesTable}>
          <div className={styles.tableHeader}>
            <div className={styles.columnTitle}>Title</div>
            <div className={styles.columnDate}>Date</div>
            <div className={styles.columnDuration}>Duration</div>
          </div>

          <div className={styles.tableBody}>
            {episodes.map((episode) => (
              <Link
                key={episode.id}
                to="/podcast/$podcastId/episode/$episodeId"
                params={{ podcastId, episodeId: episode.id.toString() }}
                className={styles.episodeRow}
              >
                <div className={styles.episodeTitle}>{episode.title}</div>
                <div className={styles.episodeDate}>
                  {new Date(episode.releaseDate).toLocaleDateString()}
                </div>
                <div className={styles.episodeDuration}>
                  {episode.duration
                    ? `${Math.round(episode.duration / 1000 / 60)} min`
                    : "-"}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
