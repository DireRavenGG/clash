import { MatchDto } from "types/MatchApi";
import { killParticipation } from "./stats";

export const getUserStats = (match: MatchDto, id: string) => {
  const gameLength = match.info.gameDuration;
  const participants = match.info.participants;
  const currentUser = participants.filter((user) => user.summonerId == id);

  const kp = killParticipation(match, id);

  const userStats = currentUser[0];
  return {
    kills: userStats.kills,
    deaths: userStats.deaths,
    assists: userStats.assists,
    win: userStats.win,
    userId: id,
    champion: userStats.championName,
    summonerSpell1: userStats.summoner1Id,
    summonerSpell2: userStats.summoner2Id,
    cs: userStats.totalMinionsKilled,
    gameLength: gameLength,
    level: userStats.champLevel,
    kp: kp,
  };
};
