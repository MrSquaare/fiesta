import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Avatar,
  BackgroundImage,
  Box,
  Flex,
  Tabs,
  Text,
} from "@mantine/core";
import { FC, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../stores/auth";
import { MinimalUser } from "../../types";
import { getUserAvatar, getUserBanner } from "../../utilities/user";

type Props = {
  user: MinimalUser;
  isCurrentUser?: boolean;
};

export const ProfileHero: FC<Props> = ({ user, isCurrentUser }) => {
  const navigate = useNavigate();

  const clearToken = useAuthStore((state) => state.clearToken);

  const onLogout = useCallback(() => {
    clearToken();
  }, [clearToken]);

  return (
    <Box>
      <BackgroundImage pos={"relative"} src={getUserBanner(user)}>
        <Flex direction={"column"} h={160} justify={"space-between"} p={8}>
          <Flex align={"center"} gap={8} justify={"space-between"}>
            <ActionIcon onClick={() => navigate(-1)} variant={"light"}>
              <Icon fontSize={"1.5rem"} icon={"ph:arrow-left"} />
            </ActionIcon>
            <ActionIcon component={Link} to={"/search"} variant={"light"}>
              <Icon fontSize={"1.5rem"} icon={"ph:magnifying-glass"} />
            </ActionIcon>
          </Flex>
        </Flex>
      </BackgroundImage>
      <Box p={8}>
        <Flex align={"center"} justify={"space-between"} mb={4} mt={-40}>
          <Avatar radius={"50%"} size={64} src={getUserAvatar(user)} />
          {isCurrentUser ? (
            <Flex align={"center"} gap={8}>
              <ActionIcon variant={"light"}>
                <Icon fontSize={"1.5rem"} icon={"ph:pencil"} />
              </ActionIcon>
              <ActionIcon variant={"light"}>
                <Icon fontSize={"1.5rem"} icon={"ph:gear"} />
              </ActionIcon>
              <ActionIcon onClick={onLogout} variant={"light"}>
                <Icon fontSize={"1.5rem"} icon={"ph:sign-out"} />
              </ActionIcon>
            </Flex>
          ) : null}
        </Flex>
        <Flex align={"center"} gap={8} mb={4}>
          <Text size={"lg"} weight={"bold"}>
            {user.display_name}
          </Text>
          <Text color={"dark.3"}>@{user.username}</Text>
        </Flex>
        {user.biography ? <Text mb={4}>{user.biography}</Text> : null}
        <Flex align={"center"} gap={8}>
          <Text>
            <Text span={true} weight={"bold"}>
              {user.following_count}
            </Text>{" "}
            followings
          </Text>
          <Text>
            <Text span={true} weight={"bold"}>
              {user.followers_count}
            </Text>{" "}
            followers
          </Text>
        </Flex>
      </Box>
      <Tabs defaultValue={"gallery"}>
        <Tabs.List>
          <Tabs.Tab sx={{ flexGrow: 1 }} value={"posts"}>
            Posts
          </Tabs.Tab>
          <Tabs.Tab sx={{ flexGrow: 1 }} value={"likes"}>
            Likes
          </Tabs.Tab>
          <Tabs.Tab sx={{ flexGrow: 1 }} value={"comments"}>
            Comments
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Box>
  );
};
