import { FC } from "react";

import { SearchTopBar } from "../../components/Search/SearchTopBar";

export const Search: FC = () => {
  return (
    <div
      className={"flex h-full flex-col overflow-auto bg-gray-900 text-white"}
    >
      <div className={"fixed top-0 w-full"}>
        <SearchTopBar />
      </div>
    </div>
  );
};
