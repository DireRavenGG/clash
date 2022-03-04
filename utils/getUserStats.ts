import { ApiResponseDTO, MatchV5DTOs } from "twisted/dist/models-dto";

export const getUserStats = (match: MatchV5DTOs.MatchDto, id: string) => {
  const gameLength = match.info.gameDuration;
  const participants = match.info.participants;
  const currentUser = participants.filter((user) => user.puuid == id);

  const userStats = currentUser[0];
  return {
    kills: userStats.kills,
    deaths: userStats.deaths,
    assists: userStats.assists,
    win: userStats.win,
    uuid: id,
    champion: userStats.championName,
    summonerSpell1: userStats.summoner1Id,
    summonerSpell2: userStats.summoner2Id,
    cs: userStats.totalMinionsKilled,
    gameLength: gameLength,
    level: userStats.champLevel,
  };
};
