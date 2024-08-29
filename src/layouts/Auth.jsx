import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="w-[100vw]">
      <Outlet />
    </div>
  );
};

export default Auth;
