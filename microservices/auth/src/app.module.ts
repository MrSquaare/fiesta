import { ApolloDriverConfig, ApolloFederationDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      playground: false,
      autoSchemaFile: { federation: 2 },
    }),
    AuthModule,
  ],
})
export class AppModule {}
