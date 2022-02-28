import { Text, Group, Title } from "@mantine/core";

type MatchResultProps = {
  won: boolean;
  roundsWon: number;
  roundsPlayed: number;
};

const MatchResult = ({ won, roundsWon, roundsPlayed }: MatchResultProps) => {
  const color = won ? "green" : "red";
  return (
    <Group position="center" direction="column" spacing={2}>
      <Text color={color} size="lg" weight="bold">
        {won ? "Victory" : "Defeat"}
      </Text>

      <Group spacing={5}>
        <Text color={color}>{roundsWon}</Text>
        <Text color="white">:</Text>
        <Text color="white">{roundsPlayed - roundsWon}</Text>
      </Group>
    </Group>
  );
};

export default MatchResult;
