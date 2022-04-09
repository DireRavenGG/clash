import { ChampStatsProps } from "veigar/api";

export const getChampStats = async (matches: any[]) => {
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
        stats: {
          matches: 1,
          wins: win,
          kills: match.kills,
          deaths: match.deaths,
          assists: match.assists,
          cs: match.cs,
        },
      });
    } else {
      arrChampionStats[index].stats.matches += 1;
      arrChampionStats[index].stats.wins += win;
      arrChampionStats[index].stats.kills += match.kills;
      arrChampionStats[index].stats.deaths += match.deaths;
      arrChampionStats[index].stats.assists += match.assists;
      arrChampionStats[index].stats.cs += match.cs;
    }
  });

  return arrChampionStats;
};
