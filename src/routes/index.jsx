import { createFileRoute } from "@tanstack/react-router";
import PodcastList from "../components/podcast-list/PodcastList";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <PodcastList />
    </div>
  );
}
