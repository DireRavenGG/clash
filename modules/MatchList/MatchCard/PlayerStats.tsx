import { Text, Group, Badge } from "@mantine/core";
import { MatchDto } from "../../../types/MatchApi";

type PlayerStatsProps = {
  kills: number;
  deaths: number;
  assists: number;
  uuid: string;
  match: MatchDto;
};

const PlayerStats = ({
  kills,
  deaths,
  assists,
  match,
  uuid,
}: PlayerStatsProps) => {
  const kdRatio = Math.round((kills / deaths) * 10) / 10;
  let color = "white";
  if (kdRatio >= 2) {
    color = "#ffcc33";
  } else if (kdRatio >= 1.5) {
    color = "#eedc82";
  } else if (kdRatio >= 1.2) {
    color = "#eee8aa";
  }

  return (
    <Group>
      <Badge></Badge>
      <Group position="center" direction="column" spacing={0}>
        <Text color={color} size="lg" weight="bold">{`${kdRatio} K/D`}</Text>
        <Text
          color="white"
          size="xs"
          weight="lighter"
        >{`${kills} / ${deaths} / ${assists}`}</Text>
      </Group>
    </Group>
  );
};

export default PlayerStats;
