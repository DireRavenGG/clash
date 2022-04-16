import { Card, Group } from "@mantine/core";
import { RankAndSummoner, SummonerByName } from "../../../types/SummonerByName";
import Rank from "./Rank";
import SummonerIcon from "./SummonerIcon";

const SummonerContainer = (data: RankAndSummoner) => {
  return (
    <>
      <Card>
        <Group direction="column" align="center" sx={{ maxWidth: 700 }}>
          <SummonerIcon
            iconId={data.summonerData.profileIconId}
            userName={data.summonerData.name}
          />
          <Rank
            tier={data.rank.tier}
            rank={data.rank.rank}
            wins={data.rank.wins}
            losses={data.rank.losses}
            lp={data.rank.leaguePoints}
          />
        </Group>
      </Card>
    </>
  );
};

export default SummonerContainer;
