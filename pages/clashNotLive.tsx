import { Container, Group, Text } from "@mantine/core";
import HomeButton from "modules/HomeButton";

const clashNotLive = () => {
  return (
    <>
      <Container mt={300} sx={{ width: "500px" }}>
        <Group direction="column" grow>
          <Text align="center" weight="bold" sx={{ fontSize: "32px" }}>
            Clash Is Not Live
          </Text>
          <HomeButton />
        </Group>
      </Container>
    </>
  );
};

export default clashNotLive;
