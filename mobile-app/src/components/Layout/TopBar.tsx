import { InlineIcon } from "@iconify/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

import { useAppStore } from "../../stores/app";
import { getUserAvatar } from "../../utilities/user";

export const TopBar: FC = () => {
  const currentUser = useAppStore((state) => state.currentUser);

  if (!currentUser) return null;

  return (
    <div
      className={
        "w-100 flex items-center justify-between border-b border-b-gray-800 bg-gray-900 p-3 text-white"
      }
    >
      <NavLink className={"p-1"} to={"/profile"}>
        <img
          className={"h-8 w-8 rounded-full"}
          src={getUserAvatar(currentUser)}
        />
      </NavLink>
      <NavLink className={"p-1"} to={"/search"}>
        <InlineIcon fontSize={"1.5rem"} icon={"ph:magnifying-glass"} />
      </NavLink>
    </div>
  );
};
