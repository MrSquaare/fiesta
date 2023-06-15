import { FC } from "react";

import { Notification } from "../../components/Notification/Notification";

const notifications = Array(20).fill(<Notification />);

export const Notifications: FC = () => {
  return (
    <div className={"grid grid-cols-1 divide-y divide-gray-700"}>
      {notifications}
    </div>
  );
};
