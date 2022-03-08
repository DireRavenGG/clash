import { Container, Group } from "@mantine/core";
import ChampStats from "./ChampStats";
import PlayerInfo from "./PlayerInfo";
import PlayerRank from "./PlayerRank";

interface PlayerContainerProps {
  name: string;
  losses: number;
  lp: number;
  profileIconId: number;
  rank: string;
  summonerLevel: number;
  tier: string;
  wins: number;
  champStats: any[];
}

const PlayerContainer = ({
  name,
  losses,
  lp,
  profileIconId,
  rank,
  summonerLevel,
  tier,
  wins,
  champStats,
}: PlayerContainerProps) => {
  return (
    <Container
      sx={{
        backgroundColor: "darkslategrey",
        padding: "15px",
        borderRadius: "20px",
        width: "220px",
        height: "100%",
      }}
    >
      <Group direction="column" position="center">
        <PlayerInfo username={name} iconId={profileIconId} />
        <PlayerRank
          tier={tier}
          rank={rank}
          lp={lp}
          wins={wins}
          losses={losses}
        />
        <ChampStats champStats={champStats} />
      </Group>
    </Container>
  );
};

export default PlayerContainer;
