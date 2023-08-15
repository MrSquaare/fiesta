import { Flex } from "@mantine/core";
import { FC } from "react";

import { PostCard } from "../../components/Post/PostCard";

const posts = Array(10)
  .fill(null)
  .map((_, index) => <PostCard key={index} />);

export const Home: FC = () => {
  return (
    <Flex direction={"column"} gap={8} p={8}>
      {posts}
    </Flex>
  );
};
