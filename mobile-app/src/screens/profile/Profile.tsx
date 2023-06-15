import { FC } from "react";

import { PostCard } from "../../components/Post/PostCard";
import { ProfileHero } from "../../components/Profile/ProfileHero";
import { ProfileTopBar } from "../../components/Profile/ProfileTopBar";

const posts = Array(10).fill(<PostCard />);

export const Profile: FC = () => {
  return (
    <div
      className={"flex h-full flex-col overflow-auto bg-gray-900 text-white"}
    >
      <div className={"fixed top-0 w-full"}>
        <ProfileTopBar />
      </div>
      <ProfileHero />
      <div className={"flex flex-col gap-3 p-3"}>{posts}</div>
    </div>
  );
};
