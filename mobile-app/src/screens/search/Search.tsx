import { Box } from "@mantine/core";
import { FC } from "react";

import { SearchTopBar } from "../../components/Search/SearchTopBar";

export const Search: FC = () => {
  return (
    <>
      <Box sx={{ position: "sticky", top: 0 }}>
        <SearchTopBar />
      </Box>
    </>
  );
};
