import { Group } from "@mantine/core";
import { MatchDetails } from "types/MatchData";
import MatchCard from "./MatchCard";

const MatchesContainer = ({ matches }: { matches: MatchDetails[] }) => {
  let allMatches = [...matches];
  let reversed = allMatches.reverse();

  return (
    <>
      <Group direction="column" spacing={8}>
        {reversed?.map((match, index) => (
          <MatchCard key={index} {...match} />
        ))}
      </Group>
    </>
  );
};

export default MatchesContainer;
