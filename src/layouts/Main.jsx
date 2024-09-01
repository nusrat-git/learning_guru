import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Shared/Topbar";
import Footer from "../components/Shared/Footer";

const Main = () => {
  return (
    <div>
      <Topbar />
      <div className="min-h-[100vh] w-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
