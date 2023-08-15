import { Flex, SimpleGrid, Title } from "@mantine/core";
import { FC } from "react";

import { CommunityCard } from "../../components/Community/CommunityCard";

const communities = Array(10)
  .fill(null)
  .map((_, index) => <CommunityCard key={index} />);

export const Communities: FC = () => {
  return (
    <Flex direction={"column"} p={8}>
      <Title mb={"xs"} order={1} size={"h2"}>
        Official communities
      </Title>
      <SimpleGrid cols={2} spacing={8}>
        {communities}
      </SimpleGrid>
      <Title mb={"xs"} order={1} size={"h2"}>
        Popular communities
      </Title>
      <SimpleGrid cols={2} spacing={8}>
        {communities}
      </SimpleGrid>
    </Flex>
  );
};
