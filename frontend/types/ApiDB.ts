export interface UserInDB {
  puuid: string;
  name: string;
  profileIconId: number;
  summonerLevel: number;
}

export interface Player {
  id: string;
  userName: string;
  summonerLevel: number;
  profileIconId: number;
  matches: any[];
  matchlist: MatchIdArr[];
}

export interface MatchIdArr {
  id?: number;
  matchId: string;
  userId: string;
}
