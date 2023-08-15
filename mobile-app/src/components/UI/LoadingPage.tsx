import { Center, Loader } from "@mantine/core";
import { FC } from "react";

export const LoadingPage: FC = () => {
  return (
    <Center h={"100%"}>
      <Loader />
    </Center>
  );
};
