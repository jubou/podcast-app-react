import { Link } from "@tanstack/react-router";
import styles from "./PodcastListItem.module.scss";

export default function PodcastListItem({ podcast }) {
  return (
    <Link
      to="/podcast/$podcastId"
      params={{ podcastId: podcast.id }}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        <img
          src={podcast?.image || "https://picsum.photos/170"}
          alt={podcast?.name || "Podcast"}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          {(podcast?.name || "Podcast Title").toUpperCase()}
        </h3>
        <p className={styles.artist}>
          Author: {podcast?.artist || "Unknown Artist"}
        </p>
      </div>
    </Link>
  );
}
