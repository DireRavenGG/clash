import { Avatar, Group, Text } from "@mantine/core";

interface PlayerInfoProps {
  username: string;
  iconId: number;
}
const PlayerInfo = ({ username, iconId }: PlayerInfoProps) => {
  return (
    <Group>
      <Avatar
        src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${iconId}.jpg`}
      />
      <Text weight="bold">{username}</Text>
    </Group>
  );
};

export default PlayerInfo;
