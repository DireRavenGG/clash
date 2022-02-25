import { Text, Group } from "@mantine/core";

type PlayerStatsProps = {
  score: number;
  kills: number;
  deaths: number;
  assists: number;
};

const PlayerStats = ({ score, kills, deaths, assists }: PlayerStatsProps) => {
  const kdRatio = Math.round((kills / deaths) * 10) / 10;
  let color = "#f5f5dc";
  if (kdRatio >= 2) {
    color = "#ffcc33";
  } else if (kdRatio >= 1.5) {
    color = "#eedc82";
  } else if (kdRatio >= 1.2) {
    color = "#eee8aa";
  }
  return (
    <Group>
      <Group position="center" direction="column" spacing={0}>
        <Text color={color} size="lg" weight="bold">{`${kdRatio} K/D`}</Text>
        <Text
          color="gray"
          size="xs"
        >{`${kills} / ${deaths} / ${assists}`}</Text>
      </Group>
      <Group position="center" direction="column" spacing={0}>
        <Text color="#f5f5dc" size="lg" weight="bold">
          {score}
        </Text>
        <Text color="gray" size="xs">
          Avg. Score
        </Text>
      </Group>
    </Group>
  );
};

export default PlayerStats;
