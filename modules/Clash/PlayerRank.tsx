import { Group, Image, Text } from "@mantine/core";
interface PlayerRankProps {
  rank: string;
  lp: number;
  wins: number;
  losses: number;
  tier: string;
}
const PlayerRank = ({ tier, rank, lp, wins, losses }: PlayerRankProps) => {
  const allGames = wins + losses;
  const winRate = Math.round((wins / allGames) * 100);

  return (
    <Group direction="column" spacing="xs" position="center">
      <Image
        alt="solo queue rank"
        src={`https://raw.communitydragon.org/12.5/plugins/rcp-fe-lol-shared-components/global/default/${tier.toLowerCase()}.png`}
        width={100}
      />
      <Group direction="row" spacing="xs">
        <Text weight="bold">{tier}</Text>
        <Text weight="bold">{rank}</Text>
      </Group>
      <Text>{winRate}%</Text>
    </Group>
  );
};

export default PlayerRank;
