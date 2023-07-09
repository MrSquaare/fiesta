import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

export const mapErrorToException = (error: any) => {
  switch (error.status) {
    case 400:
      return new BadRequestException(error.message, error.options);
    case 401:
      return new UnauthorizedException(error.message, error.options);
    case 403:
      return new ForbiddenException(error.message, error.options);
    case 404:
      return new NotFoundException(error.message, error.options);
    case 405:
      return new MethodNotAllowedException(error.message, error.options);
    case 406:
      return new NotAcceptableException(error.message, error.options);
    case 409:
      return new ConflictException(error.message, error.options);
    case 500:
      return new InternalServerErrorException(error.message, error.options);
    default:
      return new InternalServerErrorException(error.message, error.options);
  }
};
