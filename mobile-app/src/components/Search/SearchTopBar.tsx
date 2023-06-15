import { InlineIcon } from "@iconify/react";
import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { SearchBar } from "./SearchBar";

export const SearchTopBar: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={
        "w-100 flex items-center gap-3 border-b border-b-gray-800 bg-gray-900 p-3 text-white"
      }
    >
      <button className={"p-1"} onClick={() => navigate(-1)} type={"button"}>
        <InlineIcon fontSize={"1.5rem"} icon={"ph:arrow-left"} />
      </button>
      <div className={"grow"}>
        <SearchBar />
      </div>
      <NavLink className={"p-1"} to={"/search"}>
        <InlineIcon fontSize={"1.5rem"} icon={"ph:faders"} />
        <div
          className={
            "absolute bottom-3 right-3 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-900 bg-blue-600 text-xs font-bold text-white"
          }
        >
          9+
        </div>
      </NavLink>
    </div>
  );
};
