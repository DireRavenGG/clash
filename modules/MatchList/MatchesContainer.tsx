import { Button, Container } from "@mantine/core";
import MatchCard from "modules/MatchList/MatchCard/MatchCard";
import { useEffect, useState } from "react";
import { MatchDto } from "types/MatchApi";
import { MatchesListDto } from "types/MatchList";
import { getUserStats } from "utils/getUserStats";
import { paginateMatchList } from "utils/paginateMatchList";

interface MatchesContainerProps {
  matchList: MatchesListDto;
  id: string;
}

const MatchesContainer = ({ matchList }: MatchesContainerProps) => {
  const matches = matchList.history;
  const puuid = matchList.puuid;
  let paginatedMatchIds = [];
  useEffect(() => {
    const paginatedMatches = paginateMatchList(matches);
    paginatedMatches.map((match) => paginatedMatchIds.push(match.matchId));
  });

  // call the api using matchIds
  // will need to create a way to get more matchIds. e.g. Load button
  // Maybe on click it runs refreshPaginatedMatchlist and get next 20
  // IDEA useEffect that refreshed on change to button
  // runs paginatedMatchList

  const retreivedMatches: MatchDto[] = []; // array of matches that we got from the api

  const clickHandler = () => {
    const paginatedMatches = paginateMatchList(matches);
    paginatedMatches.map((match) => paginatedMatchIds.push(match.matchId));
  };

  return (
    <>
      <Container>
        {retreivedMatches.map((match) => {
          <MatchCard match={match} {...getUserStats(match, puuid)} />;
        })}
      </Container>
      <Button onClick={clickHandler}>Load More...</Button>
    </>
  );
};

export default MatchesContainer;
