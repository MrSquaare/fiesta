import { useSignInMutation } from "@common/graphql";
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

export type SignInFieldValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignIn: FC = () => {
  const [signIn, { loading, data, error }] = useSignInMutation();

  const setToken = useAuthStore((state) => state.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFieldValues>({
    resolver: zodResolver(schema),
  });

  const apiFormValues = useMemo(
    () => convertApolloToFormErrors<SignInFieldValues>(error),
    [error]
  );
  const formValues = useMemo(
    () => convertRHFToFormErrors<SignInFieldValues>(errors),
    [errors]
  );

  const onSubmit = useCallback(
    (values: SignInFieldValues) => {
      signIn({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    },
    [signIn]
  );

  useEffect(() => {
    if (!data) return;

    setToken(data.signIn.token);
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
        Sign in
      </h1>
      {error ? (
        <div
          className={
            "my-4 flex w-full rounded-lg border border-red-800 bg-gray-800 p-4 text-sm text-red-400"
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
        <button
          className={
            "w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
          }
          disabled={loading}
          type={"submit"}
        >
          Sign in
        </button>
        <p className={"text-sm font-light text-gray-400"}>
          Don&apos;t have an account?{" "}
          <Link
            className={"font-medium text-blue-500 hover:underline"}
            to={"/sign-up"}
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
