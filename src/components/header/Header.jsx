import { Link, useRouterState } from "@tanstack/react-router";
import { useIsFetching } from "@tanstack/react-query";
import styles from "./Header.module.scss";

export default function Header() {
  const routerState = useRouterState();
  const isNavigating = routerState.status === "pending";
  const isFetching = useIsFetching() > 0;
  const isLoading = isNavigating || isFetching;

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        Podcaster
      </Link>
      <div
        className={`${styles.navigationIndicator} ${isLoading ? styles.active : ""}`}
      ></div>
    </header>
  );
}
