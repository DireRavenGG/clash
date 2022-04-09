import { Group, Text } from "@mantine/core";

interface UserStatsProps {
  kills: number;
  deaths: number;
  assists: number;
  kp: number;
}

const UserStats = ({ kills, deaths, assists, kp }: UserStatsProps) => {
  return (
    <>
      <Group>
        <Group direction="column" spacing={0} align="center">
          <Text>{`${kills} / ${deaths} / ${assists}`}</Text>
          <Text size="xs" weight="lighter">{`${kp}% kp`}</Text>
        </Group>
      </Group>
    </>
  );
};

export default UserStats;
