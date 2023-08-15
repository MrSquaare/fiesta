import { Box, Flex } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router-dom";

import { NavBar } from "../../components/Layout/NavBar";
import { TopBar } from "../../components/Layout/TopBar";

export const Root: FC = () => {
  return (
    <Flex direction={"column"} h={"100vh"}>
      <TopBar />
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <Outlet />
      </Box>
      <NavBar />
    </Flex>
  );
};
