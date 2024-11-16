import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <section className="min-h-screen">
      <Navbar isOpen={openSidebar} setIsOpen={setOpenSidebar} />
      <Sidebar setIsOpen={setOpenSidebar} isOpen={openSidebar} />
      <div className="my-5 sm:w-[70%] lg:w-[80%] max-w-[1050px] min-h-[80vh] mx-auto md:ml-auto  ">
        <Outlet />
      </div>
    </section>
  );
};

export default MainLayout;
