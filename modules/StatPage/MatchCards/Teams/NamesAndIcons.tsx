import { Avatar, Group, Text } from "@mantine/core";

interface NamesAndIconsProps {
  userName: string;
  champion: string;
  currentUser: string;
}

const NamesAndIcons = ({
  userName,
  champion,
  currentUser,
}: NamesAndIconsProps) => {
  let name = userName;

  if (userName.length > 11) {
    name = userName.slice(0, 8);
    name = name + "...";
  }

  return (
    <>
      <Group spacing={5}>
        <Avatar
          alt="champion"
          size="xs"
          radius="xl"
          src={`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${champion}.png`}
        />
        <Text size="sm" color={currentUser == userName ? "yellow" : "inherit"}>
          {name}
        </Text>
      </Group>
    </>
  );
};

export default NamesAndIcons;
