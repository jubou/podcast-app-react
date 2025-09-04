import { useQuery } from "@tanstack/react-query";
import { getPodcastWithEpisodes } from "../../api/getPodcastWithEpisodes";
import styles from "./PodcastEpisode.module.scss";

export default function PodcastEpisode({ podcastId, episodeId }) {
  const { data: podcastData, isLoading } = useQuery({
    queryKey: ["podcast-with-episodes", podcastId],
    queryFn: () => getPodcastWithEpisodes(podcastId),
    enabled: !!podcastId,
  });

  const episodes = podcastData?.episodes || [];
  const currentEpisode = episodes.find((ep) => ep.id === parseInt(episodeId));

  return isLoading ? (
    <div className={styles.loading}>Loading episode...</div>
  ) : !currentEpisode ? (
    <div className={styles.notFound}>Episode not found</div>
  ) : (
    <div className={styles.episodeDetail}>
      <h1 className={styles.episodeTitle}>{currentEpisode.title}</h1>

      {currentEpisode.description && (
        <div className={styles.episodeDescription}>
          <div
            dangerouslySetInnerHTML={{
              __html: currentEpisode.description,
            }}
          />
        </div>
      )}

      <div className={styles.audioSection}>
        {currentEpisode.audioUrl ? (
          <audio controls className={styles.audioPlayer}>
            <source src={currentEpisode.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p className={styles.noAudio}>Audio not available for this episode</p>
        )}
      </div>
    </div>
  );
}
