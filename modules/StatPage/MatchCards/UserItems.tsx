import { Box, Group, Image, SimpleGrid } from "@mantine/core";

interface UserItemsProps {
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
}

const UserItems = ({
  item0,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
}: UserItemsProps) => {
  return (
    <Group spacing={4}>
      <SimpleGrid cols={3} spacing={4}>
        {item0 == 0 ? (
          <Box
            sx={{
              width: 25,
              backgroundColor: "rgba(0,0,0,.25)",
              borderRadius: 3,
            }}
          />
        ) : (
          <Image
            alt="item 0"
            src={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${item0}.png`}
            width={25}
            radius="sm"
          />
        )}
        {item1 == 0 ? (
          <Box
            sx={{
              width: 25,
              backgroundColor: "rgba(0,0,0,.25)",
              borderRadius: 3,
            }}
          />
        ) : (
          <Image
            alt="item 1"
            src={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${item1}.png`}
            width={25}
            radius="sm"
          />
        )}
        {item2 == 0 ? (
          <Box
            sx={{
              width: 25,
              backgroundColor: "rgba(0,0,0,.25)",
              borderRadius: 3,
            }}
          />
        ) : (
          <Image
            alt="item 2"
            src={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${item2}.png`}
            width={25}
            radius="sm"
          />
        )}
        {item3 == 0 ? (
          <Box
            sx={{
              width: 25,
              backgroundColor: "rgba(0,0,0,.25)",
              borderRadius: 3,
            }}
          />
        ) : (
          <Image
            alt="item 3"
            src={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${item3}.png`}
            width={25}
            radius="sm"
          />
        )}
        {item4 == 0 ? (
          <Box
            sx={{
              width: 25,
              backgroundColor: "rgba(0,0,0,.25)",
              borderRadius: 3,
            }}
          />
        ) : (
          <Image
            alt="item 4"
            src={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${item4}.png`}
            width={25}
            radius="sm"
          />
        )}
        {item5 == 0 ? (
          <Box
            sx={{
              width: 25,
              backgroundColor: "rgba(0,0,0,.25)",
              borderRadius: 3,
            }}
          />
        ) : (
          <Image
            alt="item 5"
            src={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${item5}.png`}
            width={25}
            radius="sm"
          />
        )}
      </SimpleGrid>
      {item6 == 0 ? (
        <Box
          sx={{
            width: 25,
            backgroundColor: "rgba(0,0,0,.25)",
            borderRadius: 3,
          }}
        />
      ) : (
        <Image
          alt="item 6"
          src={`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${item6}.png`}
          width={25}
          radius="sm"
        />
      )}
    </Group>
  );
};

export default UserItems;
