import { useCreateMyUserMutation } from "@common/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Menu,
  TextInput,
  Title,
} from "@mantine/core";
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

  const apiFormErrors = useMemo(
    () => convertApolloToFormErrors<CreateProfileFieldValues>(error),
    [error]
  );
  const formErrors = useMemo(
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
    <>
      <Box pos={"absolute"} right={8} top={8}>
        <Menu>
          <Menu.Target>
            <ActionIcon variant={"light"}>
              <Icon fontSize={"1rem"} icon={"ph:dots-three"} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<Icon fontSize={"1rem"} icon={"ph:sign-out"} />}
              onClick={onLogout}
            >
              Log out
            </Menu.Item>

            {/* Other items ... */}
          </Menu.Dropdown>
        </Menu>
      </Box>
      <Flex align={"center"} direction={"column"} h={"100%"} justify={"center"}>
        <Box w={"90%"}>
          <Title align={"center"} mb={"sm"} order={1} size={"h2"}>
            Create my profile
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
                placeholder={"Username"}
                type={"text"}
                {...register("username")}
                error={formErrors?.username || apiFormErrors?.username}
              />
              <TextInput
                mb={"xs"}
                placeholder={"Display name"}
                type={"text"}
                {...register("displayName")}
                error={formErrors?.displayName || apiFormErrors?.displayName}
              />
            </Box>
            <Button
              fullWidth={true}
              loading={loading}
              mb={"xs"}
              type={"submit"}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};
