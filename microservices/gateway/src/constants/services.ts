export const SERVICE_URL = {
  Accounts: process.env.ACCOUNTS_SERVICE_URL || "http://localhost:3001/graphql",
  Auth: process.env.AUTH_SERVICE_URL || "http://localhost:3002/graphql",
  Users: process.env.USERS_SERVICE_URL || "http://localhost:3003/graphql",
  Communities:
    process.env.COMMUNITIES_SERVICE_URL || "http://localhost:3004/graphql",
  Posts: process.env.POSTS_SERVICE_URL || "http://localhost:3005/graphql",
  Timeline: process.env.TIMELINE_SERVICE_URL || "http://localhost:3006/graphql",
};
