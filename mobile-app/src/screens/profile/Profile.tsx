import { useFindMyUserQuery, useFindUserQuery } from "@common/graphql";
import { Flex } from "@mantine/core";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";

import { PostCard } from "../../components/Post/PostCard";
import { ProfileHero } from "../../components/Profile/ProfileHero";
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
    <Flex direction={"column"}>
      <ProfileHero isCurrentUser={!!myUserData} user={user} />
      <Flex direction={"column"} gap={8} p={8}>
        {posts}
      </Flex>
    </Flex>
  );
};
