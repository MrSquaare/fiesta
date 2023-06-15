import { ApolloError } from "@apollo/client";
import { ValidationError } from "class-validator";
import { FieldErrors, FieldError } from "react-hook-form";

import { FormErrors } from "../types";

export const convertCVToFormErrors = <T extends object>(
  errors: ValidationError[]
): FormErrors<T> => {
  const formErrors: FormErrors<T> = {};

  for (const error of errors) {
    const property = error.property as keyof T;
    const constraints = error.constraints;

    formErrors[property] = constraints ? Object.values(constraints) : undefined;
  }

  return formErrors;
};

export const convertApolloToFormErrors = <T extends object>(
  error: ApolloError | undefined
): FormErrors<T> | undefined => {
  const graphQLError = error?.graphQLErrors.find(
    (error) => error.extensions.code === "BAD_USER_INPUT"
  );

  if (!graphQLError) return;

  const extensions = graphQLError.extensions as any;

  return convertCVToFormErrors<T>(extensions.response.message);
};

export const convertRHFToFormErrors = <T extends object>(
  errors: FieldErrors<T> | undefined
): FormErrors<T> | undefined => {
  const formErrors: FormErrors<T> = {};
  const fieldErrors = Object.entries(errors || {});

  if (!fieldErrors.length) return;

  for (const fieldError of fieldErrors) {
    const key = fieldError[0] as keyof T;
    const content = fieldError[1] as FieldError;

    formErrors[key] = content.message ? [content.message] : undefined;
  }

  return formErrors;
};
