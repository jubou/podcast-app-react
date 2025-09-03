import { Link } from "@tanstack/react-router";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        Podcaster
      </Link>
      <div className={styles.navigationIndicator}></div>
    </header>
  );
}
