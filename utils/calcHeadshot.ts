import { DamageDto, MatchDto, PlayerRoundStatsDto } from "types/MatchApi";

export const getPlayerStats = (match: MatchDto) => {
  const playerStatsArr = [];
  const roundResults = match.roundResults;
  for (let i = 0; i < roundResults.length; i++) {
    playerStatsArr.push(...roundResults[i].playerStats);
  }

  return playerStatsArr;
};

export const getDamageStats = (arr: PlayerRoundStatsDto[], puuid: string) => {
  const damageArr = [];
  const filteredArr = arr.filter((obj) => obj.puuid == puuid);
  for (let i = 0; i < filteredArr.length; i++) {
    damageArr.push(...filteredArr[i].damage);
  }
  return damageArr;
};

export const calcHeadshot = (stats: DamageDto[]) => {
  let totalShots = 0;
  let totalHeadshots = 0;

  for (let i = 0; i < stats.length; i++) {
    const legshots = stats[i].legshots;
    const bodyshots = stats[i].bodyshots;
    const headshots = stats[i].headshots;

    totalShots += legshots + bodyshots + headshots;
    totalHeadshots += headshots;
  }
  const headshotPrecentage = Math.round((totalHeadshots / totalShots) * 100);
  return headshotPrecentage;
};
