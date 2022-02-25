import { MatchDto } from "types/MatchApi";

export const getUserStats = (match: MatchDto, id: string) => {
  const currentUser = match.players.filter((user) => user.puuid == id);
  // current user looks like {puuid: id, gameName: "" etc..}
  const userStats = currentUser[0].stats;
  const teamId = currentUser[0].teamId;
  const team = match.teams.filter((user) => user.teamId == teamId);
  const teamStats = team[0];
  return {
    kills: userStats.kills,
    deaths: userStats.deaths,
    assists: userStats.assists,
    score: userStats.score,
    roundsPlayed: teamStats.roundsPlayed,
    roundsWon: teamStats.roundsWon,
    won: teamStats.won,
    uuid: id,
    character: currentUser[0].characterId,
  };
};
