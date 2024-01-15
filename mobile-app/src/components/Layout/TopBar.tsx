import { Icon } from "@iconify/react";
import { ActionIcon, Avatar, Flex } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";

import { useAppStore } from "../../stores/app";
import { getUserAvatar } from "../../utilities/user";

export const TopBar: FC = () => {
  const currentUser = useAppStore((state) => state.currentUser);

  if (!currentUser) return null;

  return (
    <Flex align={"center"} bg={"dark.6"} justify={"space-between"} p={8}>
      <Link to={"/profile"}>
        <Avatar radius={"50%"} size={24} src={getUserAvatar(currentUser)} />
      </Link>
      <ActionIcon component={Link} to={"/search"} variant={"transparent"}>
        <Icon fontSize={"1.5rem"} icon={"ph:magnifying-glass"} />
      </ActionIcon>
    </Flex>
  );
};
