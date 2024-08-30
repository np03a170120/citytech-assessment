import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "antd";

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <>
      <div className="mx-4 bg-white px-5 my-5 pt-3 h-[calc(100vh-10rem)]">
        <h1 className="my-3 font-semibold">Dashboard</h1>
        <div className="mb-3 text-xs text-slate-600">faking api fetch...</div>
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      </div>
    </>
  );
}
