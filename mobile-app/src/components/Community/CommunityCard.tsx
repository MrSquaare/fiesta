import {
  BackgroundImage,
  Box,
  Card,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { FC } from "react";

export const CommunityCard: FC = () => {
  const theme = useMantineTheme();

  return (
    <Card>
      <Card.Section>
        <BackgroundImage src={"https://picsum.photos/1500/3000"}>
          <Box bg={theme.fn.rgba(theme.colors.gray[9], 0.5)} h={200}>
            <Title order={2} size={"h4"}>
              Community Name
            </Title>
          </Box>
        </BackgroundImage>
      </Card.Section>
    </Card>
  );
};
