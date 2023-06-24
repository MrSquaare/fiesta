import { useFindMyUserQuery, useFindUserQuery } from "@common/graphql";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";

import { PostCard } from "../../components/Post/PostCard";
import { ProfileHero } from "../../components/Profile/ProfileHero";
import { ProfileTopBar } from "../../components/Profile/ProfileTopBar";
import { LoadingPage } from "../../components/UI/LoadingPage";

type Params = {
  username?: string;
};

const posts = Array(10)
  .fill(null)
  .map((_, index) => <PostCard key={index} />);

export const Profile: FC = () => {
  const params = useParams<Params>();

  const { data: myUserData, loading: myUserLoading } = useFindMyUserQuery(
    !params.username ? {} : { skip: true }
  );
  const { data: otherUserData, loading: otherUserLoading } = useFindUserQuery(
    params.username
      ? {
          variables: {
            username: params.username,
          },
        }
      : { skip: true }
  );
  const user = useMemo(() => {
    return myUserData?.myUser ?? otherUserData?.userByUsername;
  }, [myUserData?.myUser, otherUserData?.userByUsername]);
  const loading = useMemo(() => {
    return myUserLoading || otherUserLoading;
  }, [myUserLoading, otherUserLoading]);

  if (!user || loading) {
    return <LoadingPage />;
  }

  return (
    <div
      className={"flex h-full flex-col overflow-auto bg-gray-900 text-white"}
    >
      <div className={"fixed top-0 w-full"}>
        <ProfileTopBar />
      </div>
      <ProfileHero isCurrentUser={!!myUserData} user={user} />
      <div className={"flex flex-col gap-3 p-3"}>{posts}</div>
    </div>
  );
};
