export interface MatchDetails {
  userSide: "blue" | "red";
  userTeam: ParticipantData[];
  enemyTeam: ParticipantData[];
  win: boolean;
  userData: ParticipantData;
  gameLength: number;
}

export interface ParticipantData {
  kills: number;
  deaths: number;
  assists: number;
  puuid: string;
  champion: string;
  summonerSpell1: number;
  summonerSpell2: number;
  cs: number;
  level: number;
  kp: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  lane: string;
  userName: string;
}
