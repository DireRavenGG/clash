import { Avatar, Grid, Text } from "@mantine/core";

interface SingleChampionProps {
  champion: string;
  kills: number;
  deaths: number;
  assists: number;
  wins: number;

  matches: number;
}

const SingleChampion = ({
  champion,
  kills,
  deaths,
  assists,
  wins,
  matches,
}: SingleChampionProps) => {
  const winRate = Math.round((wins / matches) * 100);
  const avgKDA = (kills + assists) / deaths;

  let color = "white";
  if (avgKDA >= 4) {
    color = "#ffcc33";
  } else if (avgKDA >= 3) {
    color = "#eedc82";
  } else if (avgKDA >= 2.5) {
    color = "#eee8aa";
  }

  return (
    <Grid justify="center" align="center">
      <Grid.Col span={2} sx={{ padding: 0 }}>
        <Avatar
          alt="champion"
          size="sm"
          radius="xl"
          src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${champion}.png`}
        />
      </Grid.Col>
      <Grid.Col span={5}>
        <Text align="center" color={color} size="xs">
          {avgKDA.toFixed(2)} KDA
        </Text>
        <Text size="xs"></Text>
      </Grid.Col>
      <Grid.Col span={3}>
        <Text align="center" size="xs">
          {matches}
        </Text>
      </Grid.Col>
      <Grid.Col span={2}>
        <Text align="center" size="xs">
          {winRate}%
        </Text>
      </Grid.Col>
    </Grid>
  );
};

export default SingleChampion;
