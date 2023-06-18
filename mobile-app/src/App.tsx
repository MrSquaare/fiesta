import { ApolloProvider } from "@apollo/client";
import { useFindMyUserLazyQuery, useFindMyUserQuery } from "@common/graphql";
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

export const App: FC = () => {
  const token = useAuthStore((state) => state.token);
  const getToken = useAuthStore((state) => state.getToken);
  const clearToken = useAuthStore((state) => state.getToken);
  const currentUser = useAppStore((state) => state.currentUser);
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);
  const [findMyUser, { data: userData, error: userError, called }] =
    useFindMyUserLazyQuery();

  useEffect(() => {
    getToken();
  }, [getToken]);

  useEffect(() => {
    if (!token) return;

    findMyUser();
  }, [findMyUser, token]);

  useEffect(() => {
    if (!called) return;

    setCurrentUser(userData?.myUser ?? null);
  }, [called, setCurrentUser, userData]);

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
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
