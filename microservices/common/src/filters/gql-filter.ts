import { Catch, HttpException } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { GraphQLError } from "graphql";

import { getErrorStatusString } from "../helpers/error";

@Catch()
export class GqlFilter implements GqlExceptionFilter {
  catch(exception: any): GraphQLError {
    if (exception instanceof GraphQLError) {
      return exception;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      const extensionCode = getErrorStatusString(status);
      const extensionMessage =
        response instanceof Object && response["message"]
          ? response["message"]
          : response;

      return new GraphQLError(exception.message, {
        extensions: {
          status: status,
          code: extensionCode,
          message: extensionMessage,
        },
      });
    }

    console.error("Internal server error", exception);

    return new GraphQLError("Internal server error", {
      extensions: {
        code: getErrorStatusString(500),
      },
    });
  }
}
