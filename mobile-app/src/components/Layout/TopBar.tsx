import { InlineIcon } from "@iconify/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const TopBar: FC = () => {
  return (
    <div
      className={
        "w-100 flex items-center justify-between border-b border-b-gray-800 bg-gray-900 p-3 text-white"
      }
    >
      <NavLink className={"p-1"} to={"/profile"}>
        <img
          className={"h-8 w-8 rounded-full"}
          src={"https://i.pravatar.cc/300"}
        />
      </NavLink>
      <NavLink className={"p-1"} to={"/search"}>
        <InlineIcon fontSize={"1.5rem"} icon={"ph:magnifying-glass"} />
      </NavLink>
    </div>
  );
};
