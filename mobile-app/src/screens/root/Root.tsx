import { FC } from "react";
import { Outlet } from "react-router-dom";

import { NavBar } from "../../components/Layout/NavBar";
import { TopBar } from "../../components/Layout/TopBar";

export const Root: FC = () => {
  return (
    <div className={"flex h-full flex-col bg-gray-900 text-white"}>
      <TopBar />
      <div className={"grow overflow-auto"}>
        <Outlet />
      </div>
      <NavBar />
    </div>
  );
};
