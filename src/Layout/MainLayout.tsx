import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="px-4 sm:px-8 md:px-16 lg:px-20">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
