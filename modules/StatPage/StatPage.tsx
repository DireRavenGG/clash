import { MatchDetails } from "types/MatchData";
import MatchesContainer from "./MatchCards/MatchesContainer";
import SummonerIcon from "./Summoner/SummonerIcon";

interface StatPageProps {
  matches: MatchDetails[];
}

const StatPage = ({ matches }: StatPageProps) => {
  return (
    <>
      <MatchesContainer matches={matches} />
    </>
  );
};

export default StatPage;
