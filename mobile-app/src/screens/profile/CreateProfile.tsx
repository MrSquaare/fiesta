import { useCreateMyUserMutation } from "@common/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAppStore } from "../../stores/app";
import { useAuthStore } from "../../stores/auth";
import {
  convertApolloToFormErrors,
  convertRHFToFormErrors,
} from "../../utilities";

export type CreateProfileFieldValues = {
  username: string;
  displayName: string;
};

const schema = z.object({
  username: z.string(),
  displayName: z.string(),
});

export const CreateProfile: FC = () => {
  const [createMyUser, { loading, data, error }] = useCreateMyUserMutation();

  const clearToken = useAuthStore((state) => state.clearToken);
  const setCurrentUser = useAppStore((state) => state.setCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProfileFieldValues>({
    resolver: zodResolver(schema),
  });

  const apiFormValues = useMemo(
    () => convertApolloToFormErrors<CreateProfileFieldValues>(error),
    [error]
  );
  const formValues = useMemo(
    () => convertRHFToFormErrors<CreateProfileFieldValues>(errors),
    [errors]
  );

  const onSubmit = useCallback(
    (values: CreateProfileFieldValues) => {
      createMyUser({
        variables: {
          username: values.username,
          displayName: values.displayName,
        },
      });
    },
    [createMyUser]
  );

  const onLogout = useCallback(() => {
    clearToken();
  }, [clearToken]);

  useEffect(() => {
    if (!data) return;

    setCurrentUser(data.createMyUser);
  }, [data, setCurrentUser]);

  return (
    <div className={"flex h-full flex-col bg-gray-900 text-white"}>
      <button
        className={
          "rounded-lg border border-gray-600 px-5 py-2.5 text-center text-sm font-medium text-gray-400 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-800"
        }
        onClick={onLogout}
        type={"button"}
      >
        Log out
      </button>
      <div
        className={
          "mx-auto flex grow flex-col items-center justify-center px-6 py-8"
        }
      >
        <h1
          className={
            "text-xl font-bold leading-tight tracking-tight text-white"
          }
        >
          Create my profile
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
              htmlFor={"username"}
            >
              Username
            </label>
            <input
              className={classNames(
                "block w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                {
                  "border-red-500":
                    formValues?.username || apiFormValues?.username,
                }
              )}
              disabled={loading}
              placeholder={"john_doe"}
              type={"text"}
              {...register("username")}
            />
            {formValues?.username || apiFormValues?.username ? (
              <p className={"mt-2 text-sm text-red-500"}>
                {formValues?.username || apiFormValues?.username}
              </p>
            ) : null}
          </div>
          <div>
            <label
              className={"mb-2 block text-sm font-medium text-white"}
              htmlFor={"displayName"}
            >
              Display name
            </label>
            <input
              className={classNames(
                "block w-full rounded-lg border border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                {
                  "border-red-500":
                    formValues?.displayName || apiFormValues?.displayName,
                }
              )}
              disabled={loading}
              placeholder={"John Doe"}
              type={"text"}
              {...register("displayName")}
            />
            {formValues?.displayName || apiFormValues?.displayName ? (
              <p className={"mt-2 text-sm text-red-500"}>
                {formValues?.displayName || apiFormValues?.displayName}
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
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
