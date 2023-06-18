import { InlineIcon } from "@iconify/react";
import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const ProfileTopBar: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={"w-100 flex items-center justify-between p-3 text-white"}>
      <button
        className={
          "inline-flex items-center rounded-full border border-white bg-gray-900/50 p-1.5 text-center hover:border-blue-600 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-white/50"
        }
        onClick={() => navigate(-1)}
        type={"button"}
      >
        <InlineIcon fontSize={"1.25rem"} icon={"ph:arrow-left"} />
      </button>
      <NavLink
        className={
          "inline-flex items-center rounded-full border border-white bg-gray-900/50 p-1.5 text-center hover:border-blue-600 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-white/50"
        }
        to={"/search"}
      >
        <InlineIcon fontSize={"1.25rem"} icon={"ph:magnifying-glass"} />
      </NavLink>
    </div>
  );
};
