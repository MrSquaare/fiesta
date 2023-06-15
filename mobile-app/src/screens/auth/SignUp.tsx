import { useSignUpMutation } from "@common/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { useAuthStore } from "../../stores/auth";
import {
  convertApolloToFormErrors,
  convertRHFToFormErrors,
} from "../../utilities";

export type SignUpFieldValues = {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    terms: z.boolean().refine((value) => value, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export const SignUp: FC = () => {
  const [signUp, { loading, data, error }] = useSignUpMutation();

  const setToken = useAuthStore((state) => state.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFieldValues>({
    resolver: zodResolver(schema),
  });

  const apiFormValues = useMemo(
    () => convertApolloToFormErrors<SignUpFieldValues>(error),
    [error]
  );
  const formValues = useMemo(
    () => convertRHFToFormErrors<SignUpFieldValues>(errors),
    [errors]
  );

  const onSubmit = useCallback(
    (values: SignUpFieldValues) => {
      signUp({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    },
    [signUp]
  );

  useEffect(() => {
    if (!data) return;

    setToken(data.signUp.token);
  }, [data, setToken]);

  return (
    <div
      className={
        "mx-auto flex h-full flex-col items-center justify-center bg-gray-900 px-6 py-8 text-white"
      }
    >
      <h1
        className={"text-xl font-bold leading-tight tracking-tight text-white"}
      >
        Sign up
      </h1>
      {error ? (
        <div
          className={
            "my-4 w-full rounded-lg bg-red-200 p-4 text-sm text-red-800"
          }
          role={"alert"}
        >
          <span className={"font-medium"}>{error.message}</span>
        </div>
      ) : null}
      <form className={"w-full space-y-4"} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            className={"mb-2 block text-sm font-medium text-white"}
            htmlFor={"email"}
          >
            Email
          </label>
          <input
            className={classNames(
              "block w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              {
                "border-red-500": formValues?.email || apiFormValues?.email,
              }
            )}
            disabled={loading}
            placeholder={"name@company.com"}
            type={"email"}
            {...register("email")}
          />
          {formValues?.email || apiFormValues?.email ? (
            <p className={"mt-2 text-sm text-red-500"}>
              {formValues?.email || apiFormValues?.email}
            </p>
          ) : null}
        </div>
        <div>
          <label
            className={"mb-2 block text-sm font-medium text-white"}
            htmlFor={"password"}
          >
            Password
          </label>
          <input
            className={classNames(
              "block w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              {
                "border-red-500":
                  formValues?.password || apiFormValues?.password,
              }
            )}
            disabled={loading}
            placeholder={"••••••••"}
            type={"password"}
            {...register("password")}
          />
          {formValues?.password || apiFormValues?.password ? (
            <p className={"mt-2 text-sm text-red-500"}>
              {formValues?.password || apiFormValues?.password}
            </p>
          ) : null}
        </div>
        <div>
          <label
            className={"mb-2 block text-sm font-medium text-white"}
            htmlFor={"confirmPassword"}
          >
            Confirm password
          </label>
          <input
            className={classNames(
              "block w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
              {
                "border-red-500":
                  formValues?.confirmPassword || apiFormValues?.confirmPassword,
              }
            )}
            disabled={loading}
            placeholder={"••••••••"}
            type={"password"}
            {...register("confirmPassword")}
          />
          {formValues?.confirmPassword || apiFormValues?.confirmPassword ? (
            <p className={"mt-2 text-sm text-red-500"}>
              {formValues?.confirmPassword || apiFormValues?.confirmPassword}
            </p>
          ) : null}
        </div>
        <div>
          <div className={"flex items-start"}>
            <div className={"flex h-5 items-center"}>
              <input
                aria-describedby={"terms"}
                className={classNames(
                  "focus:ring-3 h-4 w-4 rounded  border border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-blue-600",
                  {
                    "border-red-500": formValues?.terms || apiFormValues?.terms,
                  }
                )}
                type={"checkbox"}
                {...register("terms")}
              />
            </div>
            <div className={"ml-2 text-sm"}>
              <label className={"font-light text-gray-300"} htmlFor={"terms"}>
                I accept the{" "}
                <a
                  className={"font-medium  text-blue-500 hover:underline"}
                  href={"#"}
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          {formValues?.confirmPassword || apiFormValues?.confirmPassword ? (
            <p className={"mt-2 text-sm text-red-500"}>
              {formValues?.terms || apiFormValues?.terms}
            </p>
          ) : null}
        </div>
        <button
          className={
            "w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
          }
          disabled={loading}
          type={"submit"}
        >
          Sign up
        </button>
        <p className={"text-sm font-light text-gray-400"}>
          Already have an account?{" "}
          <Link
            className={"font-medium text-blue-500 hover:underline"}
            to={"/sign-in"}
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};
