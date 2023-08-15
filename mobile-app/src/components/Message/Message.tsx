import { Avatar, Card, Flex, Text } from "@mantine/core";
import { FC } from "react";

export const Message: FC = () => {
  return (
    <Card p={"xs"}>
      <Flex gap={"xs"} mb={"xs"}>
        <Avatar radius={"50%"} size={36} src={"https://i.pravatar.cc/300"} />
        <Flex align={"center"} justify={"space-between"} sx={{ flexGrow: 1 }}>
          <Flex align={"center"} gap={"xs"}>
            <Text>Display name</Text>
            <Text color={"dark.3"} size={"sm"}>
              @username
            </Text>
          </Flex>
          <Text color={"dark.3"} size={"sm"}>
            1h
          </Text>
        </Flex>
      </Flex>
      <Text>
        You : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
        lacinia ut est hendrerit rhoncus. Sed lorem nisl, laoreet a justo quis,
        laoreet varius lacus.
      </Text>
    </Card>
  );
};
