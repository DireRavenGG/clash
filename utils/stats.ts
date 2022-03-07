import { MatchDto } from "types/MatchApi";

export const calcCSPerMin = (cs: number, gameLength: number) => {
  const gameLengthMin = gameLength / 1000 / 60; // milliseconds  / second / min
  const csPerMin = Math.round((cs / gameLengthMin) * 10) / 10;
  return csPerMin;
};

export const killParticipation = (match: MatchDto, uuid: string) => {
  const allPlayers = match.info.participants;
  const user = allPlayers.filter((user) => user.summonerId == uuid);
  const teamId = user[0].teamId;
  let allKills = 0;
  let userKP = 0;
  for (let i = 0; i < allPlayers.length; i++) {
    let onTeam = allPlayers[i].teamId;
    let currentPlayer = allPlayers[i].summonerId;
    let playerKills = allPlayers[i].kills;
    if (onTeam == teamId) {
      allKills += playerKills;
    }
    if (currentPlayer == uuid) {
      userKP = playerKills + allPlayers[i].assists;
    }
  }

  return Math.round((userKP / allKills) * 100);
};
