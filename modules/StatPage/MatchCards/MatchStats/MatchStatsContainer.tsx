import { Box, Group, Text } from "@mantine/core";
import { ParticipantData } from "../../../../types/MatchData";
import MatchStatsSummoner from "./MatchStatsSummoner";

interface MatchStatsContainerProp {
  userTeam: ParticipantData[];
  enemyTeam: ParticipantData[];
  side: "blue" | "red";
}

const MatchStatsContainer = ({
  userTeam,
  enemyTeam,
  side,
}: MatchStatsContainerProp) => {
  let blueSide = enemyTeam;
  let redSide = userTeam;

  if (side == "blue") {
    blueSide = userTeam;
    redSide = enemyTeam;
  }

  return (
    <>
      <Group
        direction="column"
        sx={{
          marginTop: 20,
          backgroundColor: "rgba(0,0,0,.25)",

          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,.25)",
            width: "100%",
            padding: 5,
          }}
        >
          <Text>Red side</Text>
        </Box>
        {redSide.map((player) => (
          <MatchStatsSummoner key={player.puuid} summoner={player} />
        ))}

        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,.25)",
            width: "100%",
            padding: 5,
          }}
        >
          <Text>Blue side</Text>
        </Box>
        {blueSide.map((player) => (
          <MatchStatsSummoner key={player.puuid} summoner={player} />
        ))}
        <Box sx={{ marginBottom: 1 }}></Box>
      </Group>
    </>
  );
};

export default MatchStatsContainer;
