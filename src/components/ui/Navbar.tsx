import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useAuth } from "../../providers/auth";
import Logo from "../../assets/logo.png";
import DummyImage from "../../assets/dummy.png";

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
  component: Navbar,
});

function Navbar() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout().then(() => {
      router.invalidate().finally(() => {
        navigate({ to: "/login" });
      });
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div>Profile</div>,
      disabled: true,
    },
    {
      key: "2",
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ];

  return (
    <div className=" h-full w-full">
      <div className="items-center flex justify-between bg-white shadow-md py-4 px-5">
        <img className="h-12 w-12" src={Logo} alt="" />
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <img
                className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                src={DummyImage}
                alt="Bordered avatar"
              />
              <h1 className="capitalize">{auth?.user?.username}</h1>
            </Space>
          </a>
        </Dropdown>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
