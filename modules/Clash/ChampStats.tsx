import { Container } from "@mantine/core";
import SingleChampion from "./SingleChampion";
import { orderChamps } from "./utils/orderChamps";

interface ChampProps {
  champStats: any[];
}
const ChampStats = ({ champStats }: ChampProps) => {
  const ordered = orderChamps(champStats);

  return (
    <Container>
      {ordered.map((matches) => (
        <SingleChampion
          key={matches.champion}
          champion={matches.champion}
          kills={matches.stats.kills}
          assists={matches.stats.assists}
          deaths={matches.stats.deaths}
          matches={matches.stats.matches}
          wins={matches.stats.wins}
        />
      ))}
    </Container>
  );
};

export default ChampStats;
