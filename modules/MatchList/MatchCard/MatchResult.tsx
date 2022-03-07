import { Text, Group, Title } from "@mantine/core";

type MatchResultProps = {
  win: boolean;
};

const MatchResult = ({ win }: MatchResultProps) => {
  const color = win ? "green" : "red";
  return (
    <Group position="center" direction="column" spacing={2}>
      <Text color={color} size="lg" weight="bold">
        {win ? "Victory" : "Defeat"}
      </Text>
    </Group>
  );
};

export default MatchResult;
