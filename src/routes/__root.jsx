import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div>
          <header>
            <h1>Podcaster</h1>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </>
    );
  },
});
