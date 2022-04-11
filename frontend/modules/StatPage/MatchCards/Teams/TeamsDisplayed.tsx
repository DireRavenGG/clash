import { Group } from "@mantine/core";
import { ParticipantData } from "types/MatchData";
import NamesAndIcons from "./NamesAndIcons";

interface TeamsDisplayedProps {
  userTeam: ParticipantData[];
  enemyTeam: ParticipantData[];
  side: "blue" | "red";
  user: string;
}

const TeamsDisplayed = ({
  userTeam,
  enemyTeam,
  side,
  user,
}: TeamsDisplayedProps) => {
  return (
    <Group spacing="sm">
      <Group direction="column" spacing={0}>
        {side == "blue"
          ? userTeam.map((summoner) => (
              <NamesAndIcons
                key={summoner.puuid}
                userName={summoner.userName}
                champion={summoner.champion}
                currentUser={user}
              />
            ))
          : enemyTeam.map((summoner) => (
              <NamesAndIcons
                key={summoner.puuid}
                userName={summoner.userName}
                champion={summoner.champion}
                currentUser={user}
              />
            ))}
      </Group>
      <Group direction="column" spacing={0}>
        {side == "red"
          ? userTeam.map((summoner) => (
              <NamesAndIcons
                key={summoner.puuid}
                userName={summoner.userName}
                champion={summoner.champion}
                currentUser={user}
              />
            ))
          : enemyTeam.map((summoner) => (
              <NamesAndIcons
                key={summoner.puuid}
                userName={summoner.userName}
                champion={summoner.champion}
                currentUser={user}
              />
            ))}
      </Group>
    </Group>
  );
};

export default TeamsDisplayed;
