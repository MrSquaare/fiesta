import { Button, Flex, Title } from "@mantine/core";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const WorkInProgress: FC = () => {
  const navigate = useNavigate();

  return (
    <Flex align={"center"} direction={"column"} h={"100%"} justify={"center"}>
      <Title mb={"xs"}>Work in progress</Title>
      <Button onClick={() => navigate(-1)}>Go back</Button>
    </Flex>
  );
};
