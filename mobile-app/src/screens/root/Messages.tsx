import { Flex } from "@mantine/core";
import { FC } from "react";

import { Message } from "../../components/Message/Message";

const messages = Array(10)
  .fill(null)
  .map((_, index) => <Message key={index} />);

export const Messages: FC = () => {
  return (
    <Flex direction={"column"} gap={8} p={8}>
      {messages}
    </Flex>
  );
};
