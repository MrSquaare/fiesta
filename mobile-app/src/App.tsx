import { ApolloProvider } from "@apollo/client";
import { useFindMyUserQuery } from "@common/graphql";
import { MantineProvider } from "@mantine/core";
import { FC, PropsWithChildren, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { client } from "./api/client";
import { SignIn } from "./screens/auth/SignIn";
import { SignUp } from "./screens/auth/SignUp";
import { Community } from "./screens/community/Community";
import { NewCommunity } from "./screens/community/NewCommunity";
import { NewPost } from "./screens/post/NewPost";
import { Post } from "./screens/post/Post";
import { CreateProfile } from "./screens/profile/CreateProfile";
import { Profile } from "./screens/profile/Profile";
import { Communities } from "./screens/root/Communities";
import { Home } from "./screens/root/Home";
import { Messages } from "./screens/root/Messages";
import { Notifications } from "./screens/root/Notifications";
import { Root } from "./screens/root/Root";
import { Search } from "./screens/search/Search";
import { SplashScreen } from "./screens/splash/SplashScreen";
import { useAppStore } from "./stores/app";
import { useAuthStore } from "./stores/auth";
import { isStatusError } from "./utilities";

export const App: FC = () => {
  const token = useAuthStore((state) => state.token);
  const getToken = useAuthStore((state) => state.getToken);
  const clearToken = useAuthStore((state) => state.clearToken);
  const currentUser = useAppStore((state) => state.currentUser);
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);
  const clearCurrentUser = useAppStore((state) => state.clearCurrentUser);
  const { data: userData, error: userError } = useFindMyUserQuery(
    token ? {} : { skip: true },
  );

  useEffect(() => {
    getToken();
  }, [getToken]);

  useEffect(() => {
    if (token) return;

    clearCurrentUser();
    client.resetStore();
  }, [clearCurrentUser, token]);

  useEffect(() => {
    if (!userData?.myUser) return;

    setCurrentUser(userData.myUser);
  }, [setCurrentUser, userData]);

  useEffect(() => {
    if (!userError) return;

    if (isStatusError(userError, 404)) {
      setCurrentUser(null);
    } else {
      clearToken();
    }
  }, [setCurrentUser, clearToken, userError]);

  return (
    <BrowserRouter>
      <Routes>
        {token === undefined ? (
          <Route element={<SplashScreen />} path={"*"} />
        ) : token === null ? (
          <>
            <Route element={<SignIn />} path={"/sign-in"} />
            <Route element={<SignUp />} path={"/sign-up"} />
            <Route element={<Navigate to={"/sign-in"} />} path={"*"} />
          </>
        ) : currentUser === undefined ? (
          <Route element={<SplashScreen />} path={"*"} />
        ) : currentUser === null ? (
          <>
            <Route element={<CreateProfile />} path={"/profile/create"} />
            <Route element={<Navigate to={"/profile/create"} />} path={"*"} />
          </>
        ) : (
          <>
            <Route element={<Root />} path={"/"}>
              <Route element={<Home />} index={true} />
              <Route element={<Communities />} path={"communities"} />
              <Route element={<Notifications />} path={"notifications"} />
              <Route element={<Messages />} path={"messages"} />
            </Route>
            <Route element={<Profile />} path={"/profile"} />
            <Route element={<Search />} path={"/search"} />
            <Route element={<NewPost />} path={"/post"} />
            <Route element={<Post />} path={"/posts/:postId"} />
            <Route element={<NewCommunity />} path={"/community"} />
            <Route element={<Community />} path={"/communities/:communityId"} />
            <Route element={<Navigate to={"/"} />} path={"*"} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MantineProvider forceColorScheme={"dark"}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </MantineProvider>
  );
};
