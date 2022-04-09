import { MatchDto } from "types/MatchApi";
import { ParticipantData } from "types/MatchData";
import { killParticipation } from "./stats";

export const matchData = (match: MatchDto, id: string) => {
  const gameLength = match.info.gameDuration;
  const participants = match.info.participants;
  const currentUser = participants.filter((user) => user.summonerId == id);
  let enemyTeam: ParticipantData[] = [];
  let userTeam: ParticipantData[] = [];
  let userData: ParticipantData = {
    kills: 1,
    assists: 2,
    champion: "Khazix",
    cs: 7,
    deaths: 9,
    item0: 3142,
    item1: 6691,
    item2: 3111,
    item3: 3134,
    item4: 1036,
    item5: 0,
    item6: 3364,
    kp: 40,
    lane: "JUNGLE",
    level: 13,
    puuid:
      "NHl1HwVgqVb98alFKEJATjyeJ-EnCDxLA064WcZwhrCZ6vdq4WpkISly9Z-dejXgST5XZng5MUFQgw",
    summonerSpell1: 11,
    summonerSpell2: 4,
    userName: "bofa",
  };
  let side: "blue" | "red" = "blue";
  if (currentUser[0].teamId == 200) {
    side = "red";
  }

  participants.forEach((summoner) => {
    if (summoner.summonerId == id) {
      let kp = killParticipation(match, summoner.summonerId);
      userData = {
        kills: summoner.kills,
        deaths: summoner.deaths,
        assists: summoner.assists,
        puuid: summoner.puuid,
        champion: summoner.championName,
        summonerSpell1: summoner.summoner1Id,
        summonerSpell2: summoner.summoner2Id,
        cs: summoner.totalMinionsKilled,
        level: summoner.champLevel,
        kp: kp,
        item0: summoner.item0,
        item1: summoner.item1,
        item2: summoner.item2,
        item3: summoner.item3,
        item4: summoner.item4,
        item5: summoner.item5,
        item6: summoner.item6,
        lane: summoner.teamPosition,
        userName: summoner.summonerName,
      };
    }
    if (summoner.teamId == currentUser[0].teamId) {
      let kp = killParticipation(match, summoner.summonerId);
      userTeam.push({
        kills: summoner.kills,
        deaths: summoner.deaths,
        assists: summoner.assists,
        puuid: summoner.puuid,
        champion: summoner.championName,
        summonerSpell1: summoner.summoner1Id,
        summonerSpell2: summoner.summoner2Id,
        cs: summoner.totalMinionsKilled,
        level: summoner.champLevel,
        kp: kp,
        item0: summoner.item0,
        item1: summoner.item1,
        item2: summoner.item2,
        item3: summoner.item3,
        item4: summoner.item4,
        item5: summoner.item5,
        item6: summoner.item6,
        lane: summoner.teamPosition,
        userName: summoner.summonerName,
      });
    } else {
      let kp = killParticipation(match, summoner.summonerId);
      enemyTeam.push({
        kills: summoner.kills,
        deaths: summoner.deaths,
        assists: summoner.assists,
        puuid: summoner.puuid,
        champion: summoner.championName,
        summonerSpell1: summoner.summoner1Id,
        summonerSpell2: summoner.summoner2Id,
        cs: summoner.totalMinionsKilled,
        level: summoner.champLevel,
        kp: kp,
        item0: summoner.item0,
        item1: summoner.item1,
        item2: summoner.item2,
        item3: summoner.item3,
        item4: summoner.item4,
        item5: summoner.item5,
        item6: summoner.item6,
        lane: summoner.teamPosition,
        userName: summoner.summonerName,
      });
    }
  });

  return {
    userSide: side,
    userTeam: userTeam,
    enemyTeam: enemyTeam,
    win: currentUser[0].win,
    userData: userData,
    gameLength: gameLength,
  };
};
