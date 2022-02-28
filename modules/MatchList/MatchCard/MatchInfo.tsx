import { Group, Text } from "@mantine/core";

type MatchInfoProps = {
  map: string;
  queue: string;
};
// change this shit
const MatchInfo = ({ map, queue }: MatchInfoProps) => {
  return (
    <Group>
      <Text weight="bold">{queue}</Text>
      <Text>{map}</Text>
    </Group>
  );
};

export default MatchInfo;
