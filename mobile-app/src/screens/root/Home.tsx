import { FC } from "react";

import { PostCard } from "../../components/Post/PostCard";

const posts = Array(10)
  .fill(null)
  .map((_, index) => <PostCard key={index} />);

export const Home: FC = () => {
  return <div className={"flex flex-col gap-3 p-3"}>{posts}</div>;
};
