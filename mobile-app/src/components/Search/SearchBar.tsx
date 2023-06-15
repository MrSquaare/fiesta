import { FC } from "react";

export const SearchBar: FC = () => {
  return (
    <input
      className={
        "block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
      }
      id={"default-input"}
      placeholder={"Search everywhere"}
      type={"text"}
    />
  );
};
