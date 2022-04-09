import {
  ActionIcon,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { MatchDetails } from "types/MatchData";
import useWindowDimensions from "utils/windowWidth";
import ChampionMatchCard from "./ChampionMatchCard";
import CsPerMin from "./CsPerMin";
import MatchStatsContainer from "./MatchStats/MatchStatsContainer";
import TeamsDisplayed from "./Teams/TeamsDisplayed";
import UserItems from "./UserItems";
import UserStats from "./UserStats";
import { ChevronDown, ChevronUp } from "tabler-icons-react";

const MatchCard = (match: MatchDetails) => {
  const user = match.userData;

  const [matchDetails, setMatchDetails] = useState(false);

  const { height, width } = useWindowDimensions();

  const buttonHandler = () => {
    setMatchDetails(!matchDetails);
  };

  if (width && width < 600) {
    return (
      <>
        <Card sx={{ width: width - 10 }}>
          <Grid columns={10} align="center" sx={{ padding: 0 }}>
            <Grid.Col span={3}>
              <ChampionMatchCard
                champion={user.champion}
                win={match.win}
                summonerSpell1={user.summonerSpell1}
                summonerSpell2={user.summonerSpell2}
              />
            </Grid.Col>
            <Grid.Col span={5}>
              <UserStats
                kills={user.kills}
                deaths={user.deaths}
                assists={user.assists}
                kp={user.kp}
              />
            </Grid.Col>
            <Grid.Col span={2} sx={{ textAlign: "end" }}>
              <ActionIcon onClick={buttonHandler} variant="transparent">
                {matchDetails ? <ChevronUp /> : <ChevronDown />}
              </ActionIcon>
            </Grid.Col>
          </Grid>
          {matchDetails ? <Box sx={{ height: 1000 }}></Box> : null}
        </Card>
      </>
    );
  }
  return (
    <Card sx={{ width: 700 }}>
      <Grid columns={20} align="center">
        <Grid.Col span={2}>
          <ChampionMatchCard
            champion={user.champion}
            win={match.win}
            summonerSpell1={user.summonerSpell1}
            summonerSpell2={user.summonerSpell2}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <UserStats
            kills={user.kills}
            deaths={user.deaths}
            assists={user.assists}
            kp={user.kp}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <CsPerMin cs={user.cs} gameLength={match.gameLength} />
        </Grid.Col>

        <Grid.Col span={4}>
          <UserItems
            item0={user.item0}
            item1={user.item1}
            item2={user.item2}
            item3={user.item3}
            item4={user.item4}
            item5={user.item5}
            item6={user.item6}
          />
        </Grid.Col>
        <Grid.Col span={7}>
          <TeamsDisplayed
            userTeam={match.userTeam}
            enemyTeam={match.enemyTeam}
            side={match.userSide}
            user={user.userName}
          />
        </Grid.Col>
        <Grid.Col span={1} sx={{ padding: 0 }}>
          <ActionIcon onClick={buttonHandler} variant="transparent">
            {matchDetails ? <ChevronUp /> : <ChevronDown />}
          </ActionIcon>
        </Grid.Col>
      </Grid>
      {matchDetails ? (
        <MatchStatsContainer
          userTeam={match.userTeam}
          enemyTeam={match.enemyTeam}
          side={match.userSide}
        />
      ) : null}
    </Card>
  );
};

export default MatchCard;
