import { MatchDto } from "types/MatchApi";

export const killParticipation = (match: MatchDto, uuid: string) => {
  const allPlayers = match.info.participants;
  let otherPlayerKills = 0;
  let userKP = 0;
  let userKills = 0;
  for (let i = 0; i < allPlayers.length; i++) {
    let currentPlayer = allPlayers[i].puuid;
    let playerStats = allPlayers[i].kills;
    if (currentPlayer == uuid) {
      userKP = playerStats + allPlayers[i].assists;
      userKills = playerStats;
    } else {
      otherPlayerKills += playerStats;
    }
  }
  const allKills = otherPlayerKills + userKills;

  return Math.round((userKP / allKills) * 100);
};
