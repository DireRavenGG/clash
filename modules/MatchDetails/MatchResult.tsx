import { Text, Group, Title } from "@mantine/core";

type MatchResultProps = {
  won: boolean;
  roundsWon: number;
  roundsPlayed: number;
};

const MatchResult = ({ won, roundsWon, roundsPlayed }: MatchResultProps) => {
  let color = "red";
  if (won) {
    color = "green";
  }
  return (
    <Group position="center" direction="column" spacing={2}>
      <Text color="#f5f5dc" size="lg" weight="bold">
        {won ? "Victory" : "Defeat"}
      </Text>
      <Group spacing={5}>
        <Text color={color}>{roundsWon}</Text>
        <Text>:</Text>
        <Text color="gray"> {roundsPlayed - roundsWon} </Text>
      </Group>
    </Group>
  );
};

export default MatchResult;
