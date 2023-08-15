import { ApolloError } from "@apollo/client";
import { ValidationError } from "class-validator";
import { FieldErrors } from "react-hook-form";

import { FormErrors } from "../types";

export const isStatusError = (
  error: ApolloError,
  status: number | number[]
): boolean => {
  const statuses = Array.isArray(status) ? status : [status];

  return error?.graphQLErrors.some((error) =>
    statuses.includes(error.extensions.status as number)
  );
};

export const convertCVToFormErrors = <T extends object>(
  errors: ValidationError[]
): FormErrors<T> => {
  const formErrors: FormErrors<T> = {};

  for (const error of errors) {
    const property = error.property as keyof T;
    const constraints = error.constraints;

    // TODO: Nested errors support
    formErrors[property] = constraints
      ? (Object.values(constraints) as any)
      : undefined;
  }

  return formErrors;
};

export const convertApolloToFormErrors = <T extends object>(
  error: ApolloError | undefined
): FormErrors<T> | undefined => {
  const graphQLError = error?.graphQLErrors.find(
    (error) => error.extensions.code === "BAD_REQUEST"
  );

  if (!graphQLError) return;

  const extensions = graphQLError.extensions;

  if (!(extensions.message instanceof Array)) return;

  return convertCVToFormErrors<T>(extensions.message);
};

export const convertRHFToFormErrors = <T extends object>(
  errors: FieldErrors<T> | undefined
): FormErrors<T> | undefined => {
  const formErrors: FormErrors<T> = {};
  const fieldErrors = Object.entries(errors || {});

  if (!fieldErrors.length) return;

  for (const fieldError of fieldErrors) {
    const key = fieldError[0] as keyof T;
    const content = fieldError[1];

    // TODO: Nested errors support
    formErrors[key] = content.message ? ([content.message] as any) : undefined;
  }

  return formErrors;
};
