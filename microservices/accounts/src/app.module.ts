import { AuthBridgeModule } from "@microservices/common/dist/modules/auth-bridge";
import { ApolloDriverConfig, ApolloFederationDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccountsModule } from "./accounts/accounts.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      process.env.DATABASE_TYPE === "postgres"
        ? {
            type: "postgres",
            host: process.env.DATABASE_HOST || "localhost",
            port: parseInt(process.env.DATABASE_PORT || "5432"),
            database: process.env.DATABASE_NAME || "postgres",
            username: process.env.DATABASE_USER || "postgres",
            password: process.env.DATABASE_PASSWORD || "postgres",
            autoLoadEntities: true,
            synchronize: true,
          }
        : {
            type: "better-sqlite3",
            database: process.env.DATABASE_FILE || "sqlite.db",
            autoLoadEntities: true,
            synchronize: true,
          },
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      playground: false,
      autoSchemaFile: { federation: 2 },
    }),
    AccountsModule,
    AuthBridgeModule.forRoot({
      redisHost: process.env.AUTH_BRIDGE_REDIS_HOST || "localhost",
      redisPort: parseInt(process.env.AUTH_BRIDGE_REDIS_PORT || "6379"),
    }),
  ],
})
export class AppModule {}
