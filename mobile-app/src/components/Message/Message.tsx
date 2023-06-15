import { FC } from "react";

export const Message: FC = () => {
  return (
    <div className={"flex p-2"}>
      <img
        className={"mr-2 h-12 w-12 rounded-full"}
        src={"https://i.pravatar.cc/300"}
      />
      <div className={"grow"}>
        <div className={"flex justify-between"}>
          <div>
            <span className={"mr-1 font-bold"}>Username</span>
            <span className={"text-gray-400"}>@Username</span>
          </div>
          <div>
            <span className={"text-gray-400"}>1h</span>
          </div>
        </div>
        <div className={"text-gray-400 line-clamp-2"}>
          You : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          lacinia ut est hendrerit rhoncus. Sed lorem nisl, laoreet a justo
          quis, laoreet varius lacus.
        </div>
      </div>
    </div>
  );
};
