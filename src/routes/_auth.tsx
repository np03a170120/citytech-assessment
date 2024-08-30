import { createFileRoute, redirect } from "@tanstack/react-router";
import Navbar from "../components/ui/Navbar";
import NavigationMenu from "../components/ui/NavigationMenu";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="flex flex-1 h-screen">
      <NavigationMenu />
      <Navbar />
    </div>
  );
}
