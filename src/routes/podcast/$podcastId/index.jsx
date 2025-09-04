import { createFileRoute } from "@tanstack/react-router";
import PodcastEpisodesList from "../../../components/podcast-episodes-list/PodcastEpisodesList";

export const Route = createFileRoute("/podcast/$podcastId/")({
  component: PodcastDetailPage,
});

function PodcastDetailPage() {
  const { podcastId } = Route.useParams();
  return <PodcastEpisodesList podcastId={podcastId} />;
}
