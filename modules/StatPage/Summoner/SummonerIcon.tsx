import { Avatar, Box, Center, Group, Text } from "@mantine/core";

interface SummonerIconProps {
  iconId: number;
  userName: string;
}

const SummonerIcon = ({ iconId, userName }: SummonerIconProps) => {
  return (
    <Group direction="column" align="center">
      <Avatar
        size="xl"
        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${iconId}.jpg`}
      />

      <Text weight="bolder" size="xl">
        {userName}
      </Text>
    </Group>
  );
};

export default SummonerIcon;
