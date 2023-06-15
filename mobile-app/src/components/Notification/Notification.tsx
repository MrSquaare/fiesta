import { InlineIcon } from "@iconify/react";
import { FC } from "react";

export const Notification: FC = () => {
  return (
    <div className={"flex p-2"}>
      <InlineIcon className={"mr-2"} fontSize={"1.25rem"} icon={"ph:user"} />
      <div className={"flex grow items-center"}>
        <img
          className={"mr-2 h-8 w-8 rounded-full"}
          src={"https://i.pravatar.cc/300"}
        />
        <div className={"flex grow justify-between"}>
          <div>
            <span className={"font-bold"}>Username</span> followed you.
          </div>
          <div>
            <span className={"text-gray-400"}>1h</span>
          </div>
        </div>
      </div>
    </div>
  );
};
