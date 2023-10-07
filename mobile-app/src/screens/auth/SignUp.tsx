import { useSignUpMutation } from "@common/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  Alert,
  Anchor,
  Box,
  Button,
  Checkbox,
  Flex,
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

  const apiFormErrors = useMemo(
    () => convertApolloToFormErrors<SignUpFieldValues>(error),
    [error],
  );
  const formErrors = useMemo(
    () => convertRHFToFormErrors<SignUpFieldValues>(errors),
    [errors],
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
    [signUp],
  );

  useEffect(() => {
    if (!data) return;

    setToken(data.signUp.token);
  }, [data, setToken]);

  return (
    <Flex align={"center"} direction={"column"} h={"100%"} justify={"center"}>
      <Box w={"90%"}>
        <Title align={"center"} mb={"sm"} order={1} size={"h2"}>
          Sign Up
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
          <TextInput
            mb={"xs"}
            placeholder={"Confirm password"}
            type={"password"}
            {...register("confirmPassword")}
            error={
              formErrors?.confirmPassword || apiFormErrors?.confirmPassword
            }
          />
          <Checkbox
            label={
              <>
                I accept the <Anchor href={"#"}>Terms and Conditions</Anchor>{" "}
              </>
            }
            mb={"xs"}
            {...register("terms")}
            error={formErrors?.terms || apiFormErrors?.terms}
          />
          <Button fullWidth={true} loading={loading} mb={"xs"} type={"submit"}>
            Sign up
          </Button>
        </Box>
        <Text>
          Already have an account?{" "}
          <Anchor component={Link} to={"/sign-in"}>
            Sign in
          </Anchor>
        </Text>
      </Box>
    </Flex>
  );
};
