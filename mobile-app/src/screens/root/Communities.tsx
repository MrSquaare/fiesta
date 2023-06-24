import { FC } from "react";

import { CommunityCard } from "../../components/Community/CommunityCard";

const communities = Array(10)
  .fill(null)
  .map((_, index) => <CommunityCard key={index} />);

export const Communities: FC = () => {
  return (
    <div className={"flex flex-col p-3"}>
      <h1 className={"mb-2 text-2xl font-bold"}>Official communities</h1>
      <div className={"mb-4 grid grid-cols-2 gap-3"}>{communities}</div>
      <h1 className={"mb-2 text-2xl font-bold"}>Popular communities</h1>
      <div className={"grid grid-cols-2 gap-3"}>{communities}</div>
    </div>
  );
};
