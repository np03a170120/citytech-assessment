import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import DummyImage from "../../assets/fallback_avatar.png";
import { useAuth } from "../../providers/auth";
import { capitalize } from "../../utils/utility";

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
  const navigate = useNavigate();
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
    <div className="h-full w-full">
      <div className="items-center flex justify-end bg-white py-3 px-5 shadow-lg lg:shadow-none fixed z-20 w-full lg:relative lg:w-auto lg:px-5 ">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <img
                className="w-10 h-10 p-1 rounded-full ring-2 ring-primaryHover "
                src={DummyImage}
                alt="profile image"
              />
              <h1 className="capitalize">
                {capitalize(auth?.user?.username!)}
              </h1>
            </Space>
          </a>
        </Dropdown>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
