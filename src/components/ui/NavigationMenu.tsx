import { Link } from "@tanstack/react-router";

const NavigationMenu = () => {
  return (
    <div className="w-64 bg-white h-[100vh]  px-5 py-2">
      <ul>
        <li>
          <Link
            to="/dashboard"
            className="hover:underline data-[status='active']:font-semibold"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/transaction">Transaction</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationMenu;
