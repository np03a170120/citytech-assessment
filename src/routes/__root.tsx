import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import type { AuthContext } from "../providers/auth";

interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
