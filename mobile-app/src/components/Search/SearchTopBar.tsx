import { Icon } from "@iconify/react";
import { ActionIcon, Badge, Box, Flex } from "@mantine/core";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SearchBar } from "./SearchBar";

export const SearchTopBar: FC = () => {
  const navigate = useNavigate();

  return (
    <Flex align={"center"} bg={"dark.6"} gap={8} p={8}>
      <ActionIcon onClick={() => navigate(-1)} variant={"transparent"}>
        <Icon fontSize={"1.5rem"} icon={"ph:arrow-left"} />
      </ActionIcon>
      <Box sx={{ flex: 1 }}>
        <SearchBar />
      </Box>
      <ActionIcon
        component={Link}
        sx={{ position: "relative" }}
        to={"/search"}
        variant={"transparent"}
      >
        <Icon fontSize={"1.5rem"} icon={"ph:faders"} />
        <Box sx={{ position: "absolute", bottom: -4, left: -4, zIndex: 10 }}>
          <Badge color={"red"} size={"xs"} variant={"filled"}>
            9+
          </Badge>
        </Box>
      </ActionIcon>
    </Flex>
  );
};
