import { Flex } from "@mantine/core";
import { FC } from "react";

import { Notification } from "../../components/Notification/Notification";

const notifications = Array(20)
  .fill(null)
  .map((_, index) => <Notification key={index} />);

export const Notifications: FC = () => {
  return (
    <Flex direction={"column"} gap={8} p={8}>
      {notifications}
    </Flex>
  );
};
