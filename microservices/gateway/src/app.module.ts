import { IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

import { SERVICE_URL } from "./constants";

const subgraphs = Object.entries(SERVICE_URL).map(([name, url]) => ({
  name,
  url,
}));

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: ({ req }) => ({ req }),
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      },
      gateway: {
        buildService: ({ url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest: async ({ request, context }) => {
              const headers = context.req?.headers || {};

              for (const key in headers) {
                request.http?.headers.set(key, headers[key]);
              }
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: subgraphs,
        }),
      },
    }),
  ],
})
export class AppModule {}
