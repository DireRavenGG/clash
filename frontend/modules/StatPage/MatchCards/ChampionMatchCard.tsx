import { Avatar, Group, Image, Text } from "@mantine/core";
import { summonerSpell } from "./utils/summonerSpell";

interface ChampionMatchCardProps {
  win: boolean;
  champion: string;
  summonerSpell1: number;
  summonerSpell2: number;
}

const ChampionMatchCard = ({
  win,
  champion,
  summonerSpell1,
  summonerSpell2,
}: ChampionMatchCardProps) => {
  const spell1 = summonerSpell(summonerSpell1);
  const spell2 = summonerSpell(summonerSpell2);
  return (
    <Group direction="column" align="center" spacing="xs">
      <Text size="xs">{win ? "Victory" : "Defeat"}</Text>
      <Avatar
        alt="champion"
        size="md"
        radius="xl"
        src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${champion}.png`}
      />
      <Group direction="row" spacing={5}>
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
  );
};

export default ChampionMatchCard;
