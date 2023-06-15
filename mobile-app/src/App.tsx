import { ApolloProvider } from "@apollo/client";
import { FC, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { client } from "./api/client";
import { SignIn } from "./screens/auth/SignIn";
import { SignUp } from "./screens/auth/SignUp";
import { Community } from "./screens/community/Community";
import { NewCommunity } from "./screens/community/NewCommunity";
import { NewPost } from "./screens/post/NewPost";
import { Post } from "./screens/post/Post";
import { Profile } from "./screens/profile/Profile";
import { Communities } from "./screens/root/Communities";
import { Home } from "./screens/root/Home";
import { Messages } from "./screens/root/Messages";
import { Notifications } from "./screens/root/Notifications";
import { Root } from "./screens/root/Root";
import { Search } from "./screens/search/Search";
import { SplashScreen } from "./screens/splash/SplashScreen";
import { useAuthStore } from "./stores/auth";

export const App: FC = () => {
  const token = useAuthStore((state) => state.token);
  const getToken = useAuthStore((state) => state.getToken);

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <ApolloProvider client={client}>
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
              <Route
                element={<Community />}
                path={"/communities/:communityId"}
              />
              <Route element={<Navigate to={"/"} />} path={"*"} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};
