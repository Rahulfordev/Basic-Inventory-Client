import { Outlet } from "react-router-dom";

import Sidebar from "../components/SideBar/SideBar";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="lg:grid lg:grid-cols-5">
        <nav className="lg:col-span-1 w-12 flex-shrink-0 z-10">
          <Sidebar />
        </nav>
        <main className="lg:col-span-4 md:pl-4 md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
