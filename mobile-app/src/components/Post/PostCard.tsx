import { Icon } from "@iconify/react";
import { ActionIcon, Avatar, Card, Flex, Text } from "@mantine/core";
import { FC } from "react";

export const PostCard: FC = () => {
  return (
    <Card p={"xs"}>
      <Flex align={"center"} justify={"space-between"} mb={"xs"}>
        <Flex align={"center"} gap={"xs"}>
          <Avatar radius={"50%"} size={36} src={"https://i.pravatar.cc/300"} />
          <Text>Display name</Text>
          <Text color={"dark.3"} size={"sm"}>
            @username
          </Text>
        </Flex>
        <Text color={"dark.3"} size={"sm"}>
          1h
        </Text>
      </Flex>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia ut
        est hendrerit rhoncus. Sed lorem nisl, laoreet a justo quis, laoreet
        varius lacus.
      </Text>
      <Flex align={"center"} mt={"xs"}>
        <Flex align={"center"} sx={{ flexGrow: 1 }}>
          <ActionIcon>
            <Icon icon={"ph:heart"} />
          </ActionIcon>
          <Text size={"xs"} weight={"bold"}>
            1
          </Text>
        </Flex>
        <Flex align={"center"} sx={{ flexGrow: 1 }}>
          <ActionIcon>
            <Icon icon={"ph:chat"} />
          </ActionIcon>
          <Text size={"xs"} weight={"bold"}>
            1
          </Text>
        </Flex>
        <Flex align={"center"} sx={{ flexGrow: 1 }}>
          <ActionIcon>
            <Icon icon={"ph:share"} />
          </ActionIcon>
          <Text size={"xs"} weight={"bold"}>
            1
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
