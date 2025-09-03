import { useState } from "react";
import styles from "./PodcastFilter.module.scss";

export default function PodcastFilter({
  onFilterChange,
  totalCount,
  filteredCount,
}) {
  const [filterValue, setFilterValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterGroup}>
        <span className={styles.count}>{filteredCount}</span>
        <input
          type="text"
          placeholder="Filter podcasts..."
          value={filterValue}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>
    </div>
  );
}
