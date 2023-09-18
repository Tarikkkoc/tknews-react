import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex font-barlow h-screen mobile:h-full tablet:h-full mobile:flex-col tablet:flex-col w-full">
      <div className="flex-none">
        <Header />
      </div>
      <div className="mobile:pt-16 tablet:pt-16 grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
