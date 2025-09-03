import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="index">
      <div className="welcome">
        <h2>Welcome to Podcaster</h2>
        <p>Discover and listen to the top 100 podcasts</p>
      </div>
    </div>
  );
}
