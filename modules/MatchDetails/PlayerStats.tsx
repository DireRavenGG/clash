import { Text, Group, Badge } from "@mantine/core";
import {
  calcHeadshot,
  getDamageStats,
  getPlayerStats,
} from "../../utils/calcHeadshot";
import { MatchDto } from "../../types/MatchApi";
import { matchRanking } from "../../utils/matchRanking";
type PlayerStatsProps = {
  score: number;
  kills: number;
  deaths: number;
  assists: number;
  uuid: string;
  match: MatchDto;
};

const PlayerStats = ({
  score,
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

  const ranking = matchRanking(match, uuid);
  let ordinal = "th";
  switch (ranking) {
    case 1:
      ordinal = "st";
      break;
    case 2:
      ordinal = "nd";
      break;
    case 3:
      ordinal = "rd";
      break;
    default:
      break;
  }
  return (
    <Group>
      <Badge>
        {ranking} {ordinal}
      </Badge>
      <Group position="center" direction="column" spacing={0}>
        <Text color={color} size="lg" weight="bold">{`${kdRatio} K/D`}</Text>
        <Text
          color="white"
          size="xs"
          weight="lighter"
        >{`${kills} / ${deaths} / ${assists}`}</Text>
      </Group>
      <Group position="center" direction="column" spacing={0}>
        <Text color="white" size="lg" weight="bold">
          {score}
        </Text>
        <Text color="white" size="xs" weight="lighter">
          Avg. Score
        </Text>
      </Group>
      <Group position="center" direction="column" spacing={0}>
        <Text color="white" size="lg" weight="bold">
          {`${calcHeadshot(getDamageStats(getPlayerStats(match), uuid))} %`}
        </Text>
        <Text color="white" size="xs" weight="lighter">
          Headshot %
        </Text>
      </Group>
    </Group>
  );
};

export default PlayerStats;
