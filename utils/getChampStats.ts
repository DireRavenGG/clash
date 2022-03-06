import { Match } from "@prisma/client";
import { ChampStatsProps } from "veigar/api";

export const getChampStats = async (matches: Match[]) => {
  const arrChampionStats: ChampStatsProps[] = [];

  matches.map((match) => {
    let win = 0;
    const index = arrChampionStats.findIndex(
      (x) => x.champion == match.champion
    );

    if (match.win) {
      win = 1;
    }
    if (index == -1) {
      arrChampionStats.push({
        champion: match.champion,
        champStats: {
          matches: 1,
          wins: win,
          kills: match.kills,
          deaths: match.deaths,
          assists: match.assists,
          cs: match.cs,
        },
      });
    } else {
      arrChampionStats[index].champStats.matches += 1;
      arrChampionStats[index].champStats.wins += win;
      arrChampionStats[index].champStats.kills += match.kills;
      arrChampionStats[index].champStats.deaths += match.deaths;
      arrChampionStats[index].champStats.assists += match.assists;
      arrChampionStats[index].champStats.cs += match.cs;
    }
  });

  return arrChampionStats;
};
