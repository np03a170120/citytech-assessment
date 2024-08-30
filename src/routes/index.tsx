import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import Logo from "./../assets/full_logo.png";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();

  return (
    <>
      <div className="gap-2 h-[100vh] w-[100vw] justify-center bg-white flex flex-col items-center">
        <img className="h-[60px]" src={Logo} alt="" />
        <h1 className="text-xl font-semibold text-primaryHover mb-3">
          Assessment (Frontend Developer)
        </h1>
        <Button
          size="large"
          type="primary"
          onClick={() => {
            navigate({ to: "/login" });
          }}
        >
          Proceed
        </Button>
      </div>
    </>
  );
}
