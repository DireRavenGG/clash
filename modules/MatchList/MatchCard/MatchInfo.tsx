import { Group, Text } from "@mantine/core";
import { MatchDto } from "types/MatchApi";
import { calcCSPerMin } from "utils/calcCSPerMin";
import { killParticipation } from "utils/killParticipation";

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
