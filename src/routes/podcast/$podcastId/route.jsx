import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import PodcastSidebar from "../../../components/podcast-sidebar/PodcastSidebar";
import styles from "./PodcastLayout.module.scss";

export const Route = createFileRoute("/podcast/$podcastId")({
  component: PodcastLayout,
});

function PodcastLayout() {
  const { podcastId } = Route.useParams();
  const location = useLocation();
  const isEpisodeRoute = location.pathname.includes("/episode/");

  return (
    <div className={styles.container}>
      <PodcastSidebar podcastId={podcastId} showLink={isEpisodeRoute} />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}
