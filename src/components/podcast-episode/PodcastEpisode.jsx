import { useQuery } from "@tanstack/react-query";
import { getPodcastWithEpisodes } from "../../api/getPodcastWithEpisodes";
import styles from "./PodcastEpisode.module.scss";

export default function PodcastEpisode({ podcastId, episodeId }) {
  const { data: podcastData, isLoading } = useQuery({
    queryKey: ["podcast-with-episodes", podcastId],
    queryFn: () => getPodcastWithEpisodes(podcastId),
    enabled: !!podcastId,
  });

  if (isLoading || !podcastData) {
    return null;
  }

  const episodes = podcastData?.episodes || [];
  const currentEpisode = episodes.find((ep) => ep.id === parseInt(episodeId));

  if (!currentEpisode) {
    return <div className={styles.notFound}>Episode not found</div>;
  }

  return (
    <div className={styles.episodeDetail}>
      <div className={styles.episodeHeader}>
        <h2 className={styles.episodeTitle}>{currentEpisode.title}</h2>
      </div>

      {currentEpisode.description && (
        <div
          className={styles.episodeDescription}
          dangerouslySetInnerHTML={{ __html: currentEpisode.description }}
        />
      )}

      {currentEpisode.audioUrl && (
        <div className={styles.audioContainer}>
          <audio controls className={styles.audioPlayer} preload="metadata">
            <source src={currentEpisode.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}
