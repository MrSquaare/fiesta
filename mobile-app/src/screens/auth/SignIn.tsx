import { useSignInMutation } from "@common/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  Alert,
  Anchor,
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { useAuthStore } from "../../stores/auth";
import {
  convertApolloToFormErrors,
  convertRHFToFormErrors,
} from "../../utilities";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInFieldValues = z.infer<typeof signInSchema>;

export const SignIn: FC = () => {
  const [signIn, { loading, data, error }] = useSignInMutation();

  const setToken = useAuthStore((state) => state.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFieldValues>({
    resolver: zodResolver(signInSchema),
  });

  const apiFormErrors = useMemo(
    () => convertApolloToFormErrors<SignInFieldValues>(error),
    [error],
  );
  const formErrors = useMemo(
    () => convertRHFToFormErrors<SignInFieldValues>(errors),
    [errors],
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
    [signIn],
  );

  useEffect(() => {
    if (!data) return;

    setToken(data.signIn.token);
  }, [data, setToken]);

  return (
    <Flex align={"center"} direction={"column"} h={"100%"} justify={"center"}>
      <Box w={"90%"}>
        <Title align={"center"} mb={"sm"} order={1} size={"h2"}>
          Sign In
        </Title>
        {error ? (
          <Alert
            color={"red"}
            icon={<Icon fontSize={"1rem"} icon={"ph:warning"} />}
            mb={"xs"}
          >
            {error.message}
          </Alert>
        ) : null}
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Box pos={"relative"}>
            <LoadingOverlay overlayBlur={2} visible={loading} />
            <TextInput
              mb={"xs"}
              placeholder={"Email"}
              type={"email"}
              {...register("email")}
              error={formErrors?.email || apiFormErrors?.email}
            />
            <TextInput
              mb={"xs"}
              placeholder={"Password"}
              type={"password"}
              {...register("password")}
              error={formErrors?.password || apiFormErrors?.password}
            />
          </Box>
          <Button fullWidth={true} loading={loading} mb={"xs"} type={"submit"}>
            Sign In
          </Button>
        </Box>
        <Text>
          Don&apos;t have an account?{" "}
          <Anchor component={Link} to={"/sign-up"}>
            Sign up
          </Anchor>
        </Text>
      </Box>
    </Flex>
  );
};
