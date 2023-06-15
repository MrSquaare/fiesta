import { InlineIcon } from "@iconify/react";
import { FC } from "react";

export const PostCard: FC = () => {
  return (
    <div
      className={
        "w-full rounded-lg border border-gray-700 bg-gray-800 p-4 text-white shadow-md"
      }
    >
      <div className={"mb-2 flex items-center"}>
        <img
          className={"mr-2 h-8 w-8 rounded-full"}
          src={"https://i.pravatar.cc/300"}
        />
        <div className={"flex grow justify-between"}>
          <div>
            <span className={"mr-1 font-bold"}>Username</span>
            <span className={"text-gray-400"}>@Username</span>
          </div>
          <div>
            <span className={"text-gray-400"}>1h</span>
          </div>
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia ut
        est hendrerit rhoncus. Sed lorem nisl, laoreet a justo quis, laoreet
        varius lacus.
      </div>
      <div className={"mt-2 flex items-center"}>
        <div className={"flex grow items-center"}>
          <InlineIcon className={"mr-1"} icon={"ph:heart"} />
          <span>1</span>
        </div>
        <div className={"flex grow items-center"}>
          <InlineIcon className={"mr-1"} icon={"ph:chat"} />
          <span>1</span>
        </div>
        <div className={"flex grow items-center"}>
          <InlineIcon className={"mr-1"} icon={"ph:share"} />
          <span>1</span>
        </div>
      </div>
    </div>
  );
};
