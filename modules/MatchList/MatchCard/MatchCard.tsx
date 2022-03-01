import { Card, Divider, Group } from "@mantine/core";
import MatchResult from "./MatchResult";
import PlayerStats from "./PlayerStats";

import { MatchDto } from "types/MatchApi";
import MatchInfo from "./MatchInfo";

interface MatchCardProps {
  kills: number;
  deaths: number;
  assists: number;
  uuid: string;
  match: MatchDto;
  win: boolean;

  champion: string;
  cs: number;
  gameLength: number;
  level: number;
}

const MatchCard = ({
  kills,
  deaths,
  assists,
  uuid,
  win,
  champion,
  match,
  cs,
  gameLength,
  level,
}: MatchCardProps) => {
  return (
    <Card padding="lg" style={{ background: "#fef1" }}>
      <Group position="apart">
        <Group>
          <MatchResult win={win} />
        </Group>

        <Group>
          <Divider style={{ height: "auto" }} orientation="vertical" />
          <PlayerStats
            match={match}
            kills={kills}
            deaths={deaths}
            assists={assists}
            uuid={uuid}
          />
        </Group>
        <MatchInfo
          match={match}
          cs={cs}
          uuid={uuid}
          level={level}
          gameLength={gameLength}
        />
      </Group>
    </Card>
  );
};

export default MatchCard;
