import { Avatar, Card, Flex, Text } from "@mantine/core";
import { FC } from "react";

export const Notification: FC = () => {
  return (
    <Card p={"xs"}>
      <Flex align={"center"} gap={"xs"}>
        <Avatar radius={"50%"} size={36} src={"https://i.pravatar.cc/300"} />
        <Flex align={"center"} justify={"space-between"} sx={{ flexGrow: 1 }}>
          <Text size={"sm"}>
            <Text span={true} weight={"bold"}>
              Display name
            </Text>{" "}
            followed you.
          </Text>
          <Text color={"dark.3"} size={"sm"}>
            1h
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
