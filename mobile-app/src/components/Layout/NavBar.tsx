import { Icon } from "@iconify/react";
import { ActionIcon, Flex } from "@mantine/core";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const NavBar: FC = () => {
  return (
    <Flex
      align={"center"}
      bg={"dark.6"}
      gap={8}
      justify={"space-between"}
      p={8}
    >
      <ActionIcon
        component={NavLink}
        sx={{ flexGrow: 1 }}
        to={"/"}
        variant={"transparent"}
      >
        {
          (({ isActive }: { isActive: boolean }) => (
            <Icon
              fontSize={"1.5rem"}
              icon={isActive ? "ph:house-fill" : "ph:house"}
            />
          )) as any
        }
      </ActionIcon>
      <ActionIcon
        component={NavLink}
        sx={{ flexGrow: 1 }}
        to={"/communities"}
        variant={"transparent"}
      >
        {
          (({ isActive }: { isActive: boolean }) => (
            <Icon
              fontSize={"1.5rem"}
              icon={isActive ? "ph:users-three-fill" : "ph:users-three"}
            />
          )) as any
        }
      </ActionIcon>
      <ActionIcon
        color={"blue"}
        component={NavLink}
        sx={{ flexGrow: 1 }}
        to={"/post"}
        variant={"filled"}
      >
        {
          (({ isActive }: { isActive: boolean }) => (
            <Icon
              fontSize={"1.5rem"}
              icon={isActive ? "ph:plus-bold" : "ph:plus"}
            />
          )) as any
        }
      </ActionIcon>
      <ActionIcon
        component={NavLink}
        sx={{ flexGrow: 1 }}
        to={"/notifications"}
        variant={"transparent"}
      >
        {
          (({ isActive }: { isActive: boolean }) => (
            <Icon
              fontSize={"1.5rem"}
              icon={isActive ? "ph:bell-fill" : "ph:bell"}
            />
          )) as any
        }
      </ActionIcon>
      <ActionIcon
        component={NavLink}
        sx={{ flexGrow: 1 }}
        to={"/messages"}
        variant={"transparent"}
      >
        {
          (({ isActive }: { isActive: boolean }) => (
            <Icon
              fontSize={"1.5rem"}
              icon={isActive ? "ph:envelope-fill" : "ph:envelope"}
            />
          )) as any
        }
      </ActionIcon>
    </Flex>
  );
};
