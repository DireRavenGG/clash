import { Grid, Group, SimpleGrid } from "@mantine/core";
import PlayerContainer from "modules/Clash/PlayerContatiner";
import { withRouter } from "next/router";
import { ClashDataProps } from "pages";
import { useEffect, useState } from "react";
import { useGlobalState } from "utils/state";
import { ChampStatsProps } from "veigar/api";

interface ClashTeamProps {
  name: string;
  profileIconId: number;
  summonerLevel: number;
  rank: string;
  lp: number;
  tier: string;
  wins: number;
  losses: number;
  champStats: ChampStatsProps[];
}

const ClashTeam = () => {
  // const stats: ClashTeamProps[] = JSON.parse(query.stats);
  const [stats, setStats] = useState();
  const [globalState, updateGlobalState] = useGlobalState();

  useEffect(() => {
    setStats(globalState.data);
  }, [globalState]);

  return (
    <>
      {/* <SimpleGrid cols={5} spacing="xs">
        {stats.map((stats) => (
          <PlayerContainer key={stats.name} {...stats} />
        ))}
      </SimpleGrid> */}
    </>
  );
};

export default ClashTeam;
