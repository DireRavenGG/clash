import { Avatar, Grid, Group, Image, Text } from "@mantine/core";
import { ParticipantData } from "../../../../types/MatchData";
import { summonerSpell } from "../utils/summonerSpell";
import Kda from "./Kda";
import MatchStatsItems from "./MatchStatsItems";

const MatchStatsSummoner = ({ summoner }: { summoner: ParticipantData }) => {
  const spell1 = summonerSpell(summoner.summonerSpell1);
  const spell2 = summonerSpell(summoner.summonerSpell2);
  return (
    <>
      <Grid
        columns={10}
        sx={{ width: "100%", alignItems: "center", paddingLeft: 10 }}
      >
        <Grid.Col span={1}>
          <Group spacing={5}>
            <Avatar
              size="sm"
              radius="lg"
              src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${summoner.champion}.png`}
            ></Avatar>
            <Group direction="column" spacing={3}>
              <Image
                alt="Summoner spell 1"
                src={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/spell/Summoner${spell1}.png`}
                width={15}
                radius="sm"
              />
              <Image
                alt="Summoner spell 2"
                src={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/spell/Summoner${spell2}.png`}
                width={15}
                radius="sm"
              />
            </Group>
          </Group>
        </Grid.Col>
        <Grid.Col span={2} sx={{ alignItems: "center" }}>
          <Text size="xs">{summoner.userName}</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Kda
            kills={summoner.kills}
            deaths={summoner.deaths}
            assists={summoner.assists}
            kp={summoner.kp}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <MatchStatsItems
            item0={summoner.item0}
            item1={summoner.item1}
            item2={summoner.item2}
            item3={summoner.item3}
            item4={summoner.item4}
            item5={summoner.item5}
            item6={summoner.item6}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default MatchStatsSummoner;
