import {
  ValidationError,
  ValidationPipe as BaseValidationPipe,
} from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";

export class ValidationPipe extends BaseValidationPipe {
  // Same as the base class, but do not flatten the errors.
  // Original method https://github.com/nestjs/nest/blob/ff15bd940404dbdce7425e9cdd0d373bc2ba8084/packages/common/pipes/validation.pipe.ts#L153
  public createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      if (this.isDetailedOutputDisabled) {
        return new HttpErrorByCode[this.errorHttpStatusCode]();
      }
      return new HttpErrorByCode[this.errorHttpStatusCode](validationErrors);
    };
  }
}
