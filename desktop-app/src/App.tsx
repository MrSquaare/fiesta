import { ApolloProvider } from "@apollo/client";
import { FC } from "react";

import { client } from "./api/client";
import { Root } from "./Root";

export const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  );
};
