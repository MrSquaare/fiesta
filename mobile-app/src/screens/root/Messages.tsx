import { FC } from "react";

import { Message } from "../../components/Message/Message";

const messages = Array(10).fill(<Message />);

export const Messages: FC = () => {
  return (
    <div className={"grid grid-cols-1 divide-y divide-gray-700"}>
      {messages}
    </div>
  );
};
