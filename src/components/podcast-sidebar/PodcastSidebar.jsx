import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getPodcastWithEpisodes } from "../../api/getPodcastWithEpisodes";
import styles from "./PodcastSidebar.module.scss";

export default function PodcastSidebar({ podcastId, showLink = false }) {
  const { data: podcastData, isLoading } = useQuery({
    queryKey: ["podcast-with-episodes", podcastId],
    queryFn: () => getPodcastWithEpisodes(podcastId),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!podcastId,
  });

  const podcast = podcastData?.podcast;

  if (isLoading || !podcast) {
    return null;
  }

  const renderPodcastContent = () => (
    <>
      {podcast?.image && (
        <img
          src={podcast.image}
          alt={podcast?.name}
          className={styles.podcastImage}
        />
      )}
      <div className={styles.podcastInfo}>
        {podcast?.name && (
          <h3 className={styles.podcastTitle}>{podcast.name}</h3>
        )}
        {podcast?.artist && (
          <p className={styles.podcastAuthor}>by {podcast.artist}</p>
        )}
      </div>
    </>
  );

  return (
    <aside className={styles.sidebar}>
      {showLink ? (
        <Link
          to="/podcast/$podcastId"
          params={{ podcastId }}
          className={styles.podcastLink}
        >
          {renderPodcastContent()}
        </Link>
      ) : (
        <div className={styles.podcastLink}>{renderPodcastContent()}</div>
      )}

      {podcast?.description && (
        <div className={styles.description}>
          <h4>Description</h4>
          <p>{podcast.description}</p>
        </div>
      )}
    </aside>
  );
}
