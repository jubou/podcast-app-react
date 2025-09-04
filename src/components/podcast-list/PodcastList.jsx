import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTopPodcasts } from "../../api/getTopPodcasts";
import styles from "./PodcastList.module.scss";
import PodcastListItem from "../podcast-list-item/PodcastListItem";
import PodcastFilter from "../podcast-filter/PodcastFilter";

export default function PodcastList() {
  const [filterValue, setFilterValue] = useState("");

  const { data: podcasts = [], isLoading } = useQuery({
    queryKey: ["top-podcasts"],
    queryFn: getTopPodcasts,
  });

  const filteredPodcasts = useMemo(() => {
    if (!filterValue.trim()) return podcasts;

    const searchTerm = filterValue.toLowerCase();
    return podcasts.filter(
      (podcast) =>
        podcast.name?.toLowerCase().includes(searchTerm) ||
        podcast.artist?.toLowerCase().includes(searchTerm),
    );
  }, [podcasts, filterValue]);

  if (isLoading || !podcasts.length) {
    return null;
  }

  const hasFilterResults = filteredPodcasts.length > 0;
  const showNoResults = filterValue.trim() && !hasFilterResults;

  return (
    <div className={styles.container}>
      <PodcastFilter
        onFilterChange={setFilterValue}
        filteredCount={filteredPodcasts.length}
      />
      {hasFilterResults ? (
        <div className={styles.grid}>
          {filteredPodcasts.map((podcast) => (
            <PodcastListItem key={podcast.id} podcast={podcast} />
          ))}
        </div>
      ) : showNoResults ? (
        <div className={styles.noResults}>
          <p>
            No results found for podcasts or authors containing "{filterValue}"
          </p>
        </div>
      ) : null}
    </div>
  );
}
