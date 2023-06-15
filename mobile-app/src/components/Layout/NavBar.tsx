import { InlineIcon } from "@iconify/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const NavBar: FC = () => {
  return (
    <div
      className={
        "w-100 flex items-center justify-between border-t border-t-gray-800 bg-gray-900 p-3 text-white"
      }
    >
      <NavLink className={"p-1"} to={"/"}>
        {({ isActive }) => (
          <InlineIcon
            fontSize={"1.5rem"}
            icon={isActive ? "ph:house-fill" : "ph:house"}
          />
        )}
      </NavLink>
      <NavLink className={"p-1"} to={"/communities"}>
        {({ isActive }) => (
          <InlineIcon
            fontSize={"1.5rem"}
            icon={isActive ? "ph:users-three-fill" : "ph:users-three"}
          />
        )}
      </NavLink>
      <NavLink
        className={
          "inline-flex items-center rounded-lg border border-blue-500 p-1 text-center text-sm font-medium  text-blue-500 hover:bg-blue-700  hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-800"
        }
        to={"/post"}
      >
        {({ isActive }) => (
          <InlineIcon
            fontSize={"1.5rem"}
            icon={isActive ? "ph:plus-bold" : "ph:plus"}
          />
        )}
      </NavLink>
      <NavLink className={"p-1"} to={"/notifications"}>
        {({ isActive }) => (
          <InlineIcon
            fontSize={"1.5rem"}
            icon={isActive ? "ph:bell-fill" : "ph:bell"}
          />
        )}
      </NavLink>
      <NavLink className={"p-1"} to={"/messages"}>
        {({ isActive }) => (
          <InlineIcon
            fontSize={"1.5rem"}
            icon={isActive ? "ph:envelope-fill" : "ph:envelope"}
          />
        )}
      </NavLink>
    </div>
  );
};
