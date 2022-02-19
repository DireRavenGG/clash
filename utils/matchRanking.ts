import { MatchDto } from "types/MatchApi";

export const matchRanking = (match: MatchDto, uuid: string) => {
  const allPlayers = match.players;
  const playerScores = [];
  let userScore = 0;
  for (let i = 0; i < allPlayers.length; i++) {
    let currentPlayer = allPlayers[i].puuid;
    let playerStats = allPlayers[i].stats;
    if (currentPlayer == uuid) {
      userScore = playerStats.score;
    }
    playerScores.push(playerStats.score);
  }

  playerScores.sort((a, b) => b - a);
  return playerScores.findIndex((score) => score == userScore) + 1;
};
