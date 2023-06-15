import { ApolloDriverConfig, ApolloFederationDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

import { CommunitiesModule } from "./communities/communities.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      playground: false,
      autoSchemaFile: { federation: 2 },
    }),
    CommunitiesModule,
  ],
})
export class AppModule {}
