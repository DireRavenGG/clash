import { Group, Text } from "@mantine/core";
import { MatchDto } from "types/MatchApi";
import { killParticipation, calcCSPerMin } from "utils/stats";

type MatchInfoProps = {
  match: MatchDto;
  uuid: string;
  cs: number;
  level: number;
  gameLength: number;
};

const MatchInfo = ({ match, uuid, cs, level, gameLength }: MatchInfoProps) => {
  return (
    <Group>
      <Text>{`Level ${level}`}</Text>
      <Text>{`${cs} ${calcCSPerMin(cs, gameLength)}`}</Text>
      <Text>{`K/P ${killParticipation(match, uuid)}%`}</Text>
    </Group>
  );
};

export default MatchInfo;
