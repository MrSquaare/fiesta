import { MinimalUser } from "../types";

export const getUserAvatar = (user: MinimalUser) => {
  return `https://api.dicebear.com/6.x/thumbs/svg?seed=${user.username}&background=transparent`;
};

export const getUserBanner = (user: MinimalUser) => {
  return `https://picsum.photos/seed/${user.username}/1500/3000`;
};
