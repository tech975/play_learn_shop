// src/layouts/UserLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* hii */}
    </div>
  );
};

export default UserLayout;
