import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/header/Header";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
      </>
    );
  },
});
