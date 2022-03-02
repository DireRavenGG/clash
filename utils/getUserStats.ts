import { MatchDto } from "types/MatchApi";

export const getUserStats = (match: MatchDto, id: string) => {
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
    match: match,
    gameLength: gameLength,
    level: userStats.champLevel,
  };
};
// Probably cant use Match if going to save in DB...
// Probably should do logic before passing down to frontend.
