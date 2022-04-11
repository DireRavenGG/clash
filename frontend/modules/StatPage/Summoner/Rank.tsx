import { Box, Group, Image, Text } from "@mantine/core";

interface RankProps {
  tier: string;
  rank: string;
  lp: number;
  wins: number;
  losses: number;
}
const Rank = ({ tier, rank, lp, wins, losses }: RankProps) => {
  const allGames = wins + losses;
  const winPrecentage = Math.round((wins / allGames) * 100);

  return (
    <>
      <Group direction="column" align="center" spacing="xs">
        <Image
          alt="solo queue rank"
          src={`https://raw.communitydragon.org/12.5/plugins/rcp-fe-lol-shared-components/global/default/${tier.toLowerCase()}.png`}
          width={100}
        />
        <Group spacing={5}>
          <Text weight="bolder">{`${tier} ${rank}  `}</Text>
          <Text weight="lighter">{`- ${lp} LP`}</Text>
        </Group>
        <Group spacing={5}>
          <Text weight="bold">{` ${wins}W ${losses}L `}</Text>
          <Text weight="ligther">{`- ${winPrecentage}%  `}</Text>
        </Group>
        <Box
          sx={{
            backgroundColor: "red",
            height: 3,
            width: "100%",
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <Box
            sx={{
              backgroundColor: "lime",
              height: 3,
              width: `${winPrecentage}%`,
              borderRadius: 10,
            }}
          ></Box>
        </Box>
      </Group>
    </>
  );
};

export default Rank;
