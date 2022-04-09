import { Container, Grid, Group, Image, Text } from "@mantine/core";
import PlayerContainer from "modules/Clash/PlayerContatiner";
import HomeButton from "modules/HomeButton";
import withRouter from "next/dist/client/with-router";
import { useEffect, useState } from "react";
import { useGlobalState } from "utils/state";
import useWindowDimensions from "utils/windowWidth";
import { ChampStatsProps } from "lolApi/getClashData";

interface DemoProps {
  name: string;
  profileIconId: number;
  summonerLevel: number;
  rank: string;
  lp: number;
  tier: string;
  wins: number;
  losses: number;
  champStats: ChampStatsProps[];
}

const Demo = () => {
  const [gameStats, setGameStats] = useState<any[]>([]);
  const [globalState, updateGlobalState] = useGlobalState();

  const { height, width } = useWindowDimensions();
  useEffect(() => {
    const getData = async () => {
      const data = await fetch("api/demo")
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((rejected) => {
          console.log(rejected);
        });
      setGameStats(data);
    };
    getData();
  }, []);

  let cols = 5;

  if (width) {
    if (width <= 1200) {
      cols = 16;
    } else if (width <= 928) {
      cols = 1;
    }
  }

  return (
    <>
      <Container sx={{ maxWidth: "1500px", justifyContent: "center" }}>
        <Group
          direction="column"
          align="center"
          sx={{ width: "100%", marginTop: "50px" }}
        >
          <HomeButton />
          <Group direction="row">
            <Image src="/RosterLogo.png" alt="roster logo" width={75} />
            <Text weight={700} sx={{ fontSize: "36px" }}>
              Dream Team -
            </Text>
            <Text weight={700} color="dimmed" sx={{ fontSize: "32px" }}>
              DRM
            </Text>
          </Group>

          <Container
            sx={{
              marginTop: "50px",
              maxWidth: "1200px",
            }}
          >
            <Grid columns={cols} sx={{ justifyContent: "center" }}>
              {gameStats.length > 0
                ? gameStats.map((stats, index) => {
                    let offset = 0;
                    if (cols == 16 && index >= 3) {
                      offset = 0.1;
                    }
                    return (
                      <Grid.Col
                        key={stats.name}
                        lg={1}
                        sm={5}
                        xs={10}
                        offset={offset}
                      >
                        <PlayerContainer key={stats.name} {...stats} />
                      </Grid.Col>
                    );
                  })
                : null}
            </Grid>
          </Container>
        </Group>
      </Container>
    </>
  );
};

export default withRouter(Demo);
function componentDidMount() {
  throw new Error("Function not implemented.");
}
