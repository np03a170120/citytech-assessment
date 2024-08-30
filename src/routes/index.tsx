import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-2 grid gap-2">
      <h1 className="text-xl">Welcome to citytech Assessment!</h1>

      <ol className="list-disc list-inside px-2">
        <li>
          <Link to="/login" className="text-blue-500 hover:opacity-75">
            Go to the public login page.
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-blue-500 hover:opacity-75">
            Go to the auth-only dashboard page.
          </Link>
        </li>
      </ol>
    </div>
  );
}
