import { Summoner } from "./Summoner";

export interface SummonerByName {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface RankAndSummoner {
  summonerData: SummonerByName;
  rank: Summoner;
}
