import { Button, Center, Grid, Group, Skeleton } from "@mantine/core";
import { getSingleSummoner } from "lolApi/getSingleSummoner";
import { getTenMatches } from "lolApi/getTenMatches";
import { userRank } from "lolApi/userRank";
import StatPage from "modules/StatPage/StatPage";
import SummonerContainer from "modules/StatPage/Summoner/SummonerContainer";
import { useRouter, withRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { MatchDetails } from "types/MatchData";
import { RankAndSummoner } from "types/SummonerByName";
import useWindowDimensions from "utils/windowWidth";

const Summoner = () => {
  const [matchData, setMatchData] = useState<MatchDetails[]>();
  const [summonerData, setSummonerData] = useState<RankAndSummoner>();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { height, width } = useWindowDimensions();

  const fetchData = useCallback(async () => {
    if (typeof router.query.summonerName == "string") {
      const summonerName = router.query.summonerName;

      const data = await getSingleSummoner(summonerName);

      setMatchData(data);
    }
  }, [router.query.summonerName]);
  const getUserData = useCallback(async () => {
    if (typeof router.query.summonerName == "string") {
      const summonerName = router.query.summonerName;

      const data = await userRank(summonerName);

      setSummonerData(data);
    }
  }, [router.query.summonerName]);
  useEffect(() => {
    fetchData();
    getUserData();
  }, [fetchData, getUserData]);

  const buttonHandler = async () => {
    setIsLoading(true);
    if (!summonerData || !matchData) return;
    const addedMatches = await getTenMatches({
      puuid: summonerData.summonerData.puuid,
      ssid: summonerData.summonerData.id,
      currentMatchesLength: matchData.length,
    });
    if (!addedMatches) return;
    setMatchData([...addedMatches, ...matchData]);
    setIsLoading(false);
  };

  let summonerCol = 3;
  let matchCol = 7;

  if (width && width < 1000) {
    summonerCol = 10;
    matchCol = 10;
  }
  console.log(width, summonerCol, matchCol);

  if (matchData) {
    return (
      <div>
        <Center>
          <Grid m="xl" columns={10}>
            <Grid.Col span={summonerCol} sx={{ maxWidth: 720 }}>
              {summonerData ? <SummonerContainer {...summonerData} /> : null}
            </Grid.Col>

            <Grid.Col span={matchCol}>
              <Group direction="column" align="center">
                <StatPage matches={matchData} />
                <Button onClick={buttonHandler} loading={isLoading}>
                  {" "}
                  Load More Matches
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Center>
      </div>
    );
  }
  if (summonerData) {
    return (
      <div>
        <Center>
          <Grid m="xl" columns={10}>
            <Grid.Col span={summonerCol}>
              <SummonerContainer {...summonerData} />
            </Grid.Col>

            <Grid.Col span={matchCol}>
              <Skeleton height={120} width={600} radius="sm" />
              <Skeleton height={120} width={600} mt={10} radius="sm" />
              <Skeleton height={120} width={600} mt={10} radius="sm" />
              <Skeleton height={120} width={600} mt={10} radius="sm" />
              <Skeleton height={120} width={600} mt={10} radius="sm" />
              <Skeleton height={120} width={600} mt={10} radius="sm" />
              <Skeleton height={120} width={600} mt={10} radius="sm" />
              <Skeleton height={120} width={600} mt={10} radius="sm" />
              <Skeleton height={120} width={600} mt={10} radius="sm" />
              <Skeleton height={120} width={600} mt={10} radius="sm" />
            </Grid.Col>
          </Grid>
        </Center>
      </div>
    );
  }
  return (
    <div>
      <Center>
        <Grid m="xl" columns={10}>
          <Grid.Col span={summonerCol}>
            <Skeleton height={320} width={250} radius="sm" />
          </Grid.Col>

          <Grid.Col span={matchCol}>
            <Skeleton height={120} width={600} radius="sm" />
            <Skeleton height={120} width={600} mt={10} radius="sm" />
            <Skeleton height={120} width={600} mt={10} radius="sm" />
            <Skeleton height={120} width={600} mt={10} radius="sm" />
            <Skeleton height={120} width={600} mt={10} radius="sm" />
            <Skeleton height={120} width={600} mt={10} radius="sm" />
            <Skeleton height={120} width={600} mt={10} radius="sm" />
            <Skeleton height={120} width={600} mt={10} radius="sm" />
            <Skeleton height={120} width={600} mt={10} radius="sm" />
            <Skeleton height={120} width={600} mt={10} radius="sm" />
          </Grid.Col>
        </Grid>
      </Center>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default withRouter(Summoner);
