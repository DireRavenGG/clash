import { Group, Text } from "@mantine/core";

interface KdaProps {
  kills: number;
  deaths: number;
  assists: number;
  kp: number;
}

const Kda = ({ kills, deaths, assists, kp }: KdaProps) => {
  const killdeathAvg = (kills + assists) / deaths;
  return (
    <>
      <Group direction="column" spacing={0} align="center">
        <Text size="xs" weight="light">{`${killdeathAvg.toFixed(2)}:1`}</Text>
        <Group spacing={5}>
          <Text
            size="xs"
            weight="light"
          >{`${kills}/${deaths}/${assists}`}</Text>
          <Text size="xs" weight="lighter">{`(${kp}%)`}</Text>
        </Group>
      </Group>
    </>
  );
};

export default Kda;
