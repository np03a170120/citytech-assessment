import {
  AppstoreOutlined,
  DollarOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import { useState } from "react";
import Logo from "../../assets/logo.png";

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-primaryHover text-white rounded-md lg:hidden"
      >
        <MenuOutlined />
      </Button>

      <div
        className={`fixed top-0 left-0 w-64 min-h-screen bg-white px-5 py-2 !pr-0 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40 lg:translate-x-0 lg:relative lg:w-64 lg:flex lg:flex-col lg:bg-white lg:px-5 lg:py-2 `}
      >
        <img
          onClick={() => navigate({ to: "/login" })}
          className="h-12 w-12 mb-6 cursor-pointer"
          src={Logo}
          alt="Logo"
        />
        <ul className="h-full flex flex-col gap-1">
          <li>
            <Link
              onClick={() => setIsOpen(!isOpen)}
              activeProps={{ className: "bg-primaryHover text-white" }}
              to="/dashboard"
              className="hover:bg-primaryHover font-semibold hover:text-white hover:font-normal rounded-sm px-2 py-1 flex gap-2 text-[14px]"
            >
              <AppstoreOutlined />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(!isOpen)}
              activeProps={{ className: "bg-primaryHover text-white" }}
              className="font-semibold hover:bg-primaryHover hover:text-white hover:font-normal rounded-sm px-2 py-1 flex gap-2 text-[14px]"
              to="/transaction"
            >
              <DollarOutlined />
              Transaction
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavigationMenu;
