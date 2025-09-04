import { createFileRoute } from "@tanstack/react-router";
import PodcastEpisode from "../../../../../components/podcast-episode/PodcastEpisode";

export const Route = createFileRoute("/podcast/$podcastId/episode/$episodeId/")(
  {
    component: PodcastEpisodePage,
  },
);

function PodcastEpisodePage() {
  const { podcastId, episodeId } = Route.useParams();
  return <PodcastEpisode podcastId={podcastId} episodeId={episodeId} />;
}
