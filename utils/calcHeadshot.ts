import { MatchDto, PlayerRoundStatsDto } from "types/MatchApi";

const getPlayerStats = (match: MatchDto) => {
  const playerStatsArr = [];
  const roundResults = match.roundResults;
  for (let i = 0; i < roundResults.length; i++) {
    playerStatsArr.push(...roundResults[i].playerStats);
  }

  return playerStatsArr;
};

const getDamageStats = (arr: PlayerRoundStatsDto[], puuid: string) => {
  const damageArr = [];
  const filteredArr = arr.filter((obj) => obj.puuid == puuid);
  for (let i = 0; i < filteredArr.length; i++) {
    damageArr.push(...filteredArr[i].damage);
  }
  return damageArr;
};

export const calcHeadshot = (match: MatchDto, uuid: string) => {
  let totalShots = 0;
  let totalHeadshots = 0;
  let playerStats = getPlayerStats(match);
  let stats = getDamageStats(playerStats, uuid);
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
