import { FC } from "react";

export const CommunityCard: FC = () => {
  return (
    <div
      className={
        "aspect-h-1 aspect-w-1 w-full rounded-lg bg-gray-800 text-white shadow-md"
      }
    >
      <img
        className={"rounded-lg object-cover"}
        src={"https://picsum.photos/1500/3000"}
      />
      <div className={"flex items-end p-2"}>
        <span className={"text-xl font-bold text-white"}>Community Name</span>
      </div>
    </div>
  );
};
