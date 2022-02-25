import { Container } from "@mantine/core";
import MatchCard from "modules/MatchDetails/MatchCard";
import { MatchDto } from "types/MatchApi";
import { MatchesListDto } from "types/MatchList";
import { getUserStats } from "utils/getUserStats";
import { paginateMatchList } from "utils/paginateMatchList";

interface MatchesContainerProps {
  matchList: MatchesListDto;
  id: string;
}

const MatchesContainer = ({ matchList, id }: MatchesContainerProps) => {
  const matches = matchList.history;
  const puuid = matchList.puuid;
  const paginatedMatches = paginateMatchList(matches);
  let paginatedMatchIds = [];
  paginatedMatches.map((match) => paginatedMatchIds.push(match.matchId));
  // call the api using matchIds
  // will need to create a way to get more matchIds. e.g. Load button
  // Maybe on click it runs refreshPaginatedMatchlist and get next 20
  // Might want to move some logic into the utils..
  // IDEA useEffect that refreshed on change to button
  // runs paginatedMatchList
  paginatedMatchIds = []; // clear ids

  const retreivedMatches: MatchDto[] = []; // array of matches that we got from the api

  return (
    <Container>
      {retreivedMatches.map((match) => {
        <MatchCard match={match} {...getUserStats(match, id)} />;
      })}
    </Container>
  );
};

export default MatchesContainer;
