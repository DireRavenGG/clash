import { Card, Divider, Group } from "@mantine/core";
import MatchResult from "./MatchResult";
import PlayerStats from "./PlayerStats";
import PlayerDetails from "./PlayerDetails";
import { MatchDto } from "types/MatchApi";

interface MatchCardProps {
  score: number;
  kills: number;
  deaths: number;
  assists: number;
  uuid: string;
  match: MatchDto;
  won: boolean;
  roundsWon: number;
  roundsPlayed: number;
  character: string;
}

const MatchCard = ({
  score,
  kills,
  deaths,
  assists,
  match,
  uuid,
  won,
  roundsWon,
  roundsPlayed,
  character,
}: MatchCardProps) => {
  return (
    <Card padding="lg" style={{ background: "#fef1" }}>
      <Group position="apart">
        <Group>
          <PlayerDetails character={character} />
          <MatchResult
            won={won}
            roundsWon={roundsWon}
            roundsPlayed={roundsPlayed}
          />
        </Group>

        <Group>
          <Divider style={{ height: "auto" }} orientation="vertical" />
          <PlayerStats
            score={score}
            kills={kills}
            deaths={deaths}
            assists={assists}
            match={match}
            uuid={uuid}
          />
        </Group>
      </Group>
    </Card>
  );
};

export default MatchCard;
