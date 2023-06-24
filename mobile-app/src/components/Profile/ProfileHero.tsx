import { InlineIcon } from "@iconify/react";
import { FC, useCallback } from "react";

import { useAuthStore } from "../../stores/auth";
import { MinimalUser } from "../../types";
import { getUserAvatar, getUserBanner } from "../../utilities/user";

type Props = {
  user: MinimalUser;
  isCurrentUser?: boolean;
};

export const ProfileHero: FC<Props> = ({ user, isCurrentUser }) => {
  const clearToken = useAuthStore((state) => state.clearToken);

  const onLogout = useCallback(() => {
    clearToken();
  }, [clearToken]);

  return (
    <div className={"border-b border-b-gray-700"}>
      <div>
        <img
          className={"h-28 w-full overflow-hidden bg-gray-800 object-cover"}
          src={getUserBanner(user)}
        />
        <div className={"-mt-8 flex items-center justify-between px-3"}>
          <img className={"h-16 w-16 rounded-full"} src={getUserAvatar(user)} />
          {isCurrentUser ? (
            <div className={"flex items-center gap-2"}>
              <button
                className={
                  "inline-flex items-center rounded-full border border-white bg-gray-900/50 p-1.5 text-center hover:border-blue-600 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-white/50"
                }
                type={"button"}
              >
                <InlineIcon fontSize={"1.25rem"} icon={"ph:pencil"} />
              </button>
              <button
                className={
                  "inline-flex items-center rounded-full border border-white bg-gray-900/50 p-1.5 text-center hover:border-blue-600 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-white/50"
                }
                type={"button"}
              >
                <InlineIcon fontSize={"1.25rem"} icon={"ph:gear"} />
              </button>
              <button
                className={
                  "inline-flex items-center rounded-full border border-white bg-gray-900/50 p-1.5 text-center hover:border-blue-600 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-white/50"
                }
                onClick={onLogout}
              >
                <InlineIcon fontSize={"1.25rem"} icon={"ph:sign-out"} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className={"p-3"}>
        <div className={"mb-2"}>
          <span className={"mr-1 text-xl font-bold"}>{user.display_name}</span>
          <span className={"text-gray-400"}>@{user.username}</span>
        </div>
        {user.biography ? <div className={"mb-2"}>{user.biography}</div> : null}
        <div className={"flex items-center gap-2"}>
          <div>
            <span className={"font-bold"}>{user.following_count}</span>{" "}
            <span className={"text-gray-400"}>followings</span>
          </div>
          <div>
            <span className={"font-bold"}>{user.followers_count}</span>{" "}
            <span className={"text-gray-400"}>followers</span>
          </div>
        </div>
      </div>
      <div className={"p-3"}>
        <ul
          className={
            "flex  overflow-auto text-center text-sm font-medium text-gray-400"
          }
        >
          <li className={"mr-2"}>
            <a
              aria-current={"page"}
              className={
                "active inline-block rounded-lg bg-blue-600 px-3 py-2 text-white"
              }
              href={"#"}
            >
              Posts
            </a>
          </li>
          <li>
            <a
              className={
                "inline-block rounded-lg px-3 py-2 hover:bg-gray-800 hover:text-white"
              }
              href={"#"}
            >
              Likes
            </a>
          </li>
          <li className={"mr-2"}>
            <a
              className={
                "inline-block rounded-lg px-3 py-2 hover:bg-gray-800 hover:text-white"
              }
              href={"#"}
            >
              Comments
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
