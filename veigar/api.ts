import { Summoner } from "../types/Summoner";

interface IsUserInDBProps {
  puuid: string;
  name: string;
  profileIconId: number;
  summonerLevel: number;
}
interface Player {
  id: string;
  userName: string;
  summonerLevel: number;
  profileIconId: number;
  matches: any[];
  matchlist: string[];
}
const key = "api_key=" + process.env.API_KEY;
export async function getSummonerId(name: string) {
  // Hardcoded to NA could make it work with diff regions
  let link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${key}`;

  const response = await fetch(link);

  let data = await response.json();

  const userData = await isUserInDB({
    puuid: data.puuid,
    name: data.name,
    profileIconId: data.profileIconId,
    summonerLevel: data.summonerLevel,
  });

  const summoner = await summonerStats(data.summonerId);

  const soloQueueArr = summoner.filter(
    (ranked) => ranked.queueType === "RANKED_SOLO_5x5"
  );

  const soloQueue = soloQueueArr[0];

  const allMatches = soloQueue.wins + soloQueue.losses;

  getMatchlist(data.puuid, allMatches, userData);

  return;
}
export async function isUserInDB({
  puuid,
  name,
  profileIconId,
  summonerLevel,
}: IsUserInDBProps) {
  const response = await fetch(`/api/database/searchUser/${puuid}`);

  let data: Player = await response.json();

  if (!data.id) {
    createUser({ puuid, name, profileIconId, summonerLevel });
    return {
      id: puuid,
      userName: name,
      summonerLevel: summonerLevel,
      profileIconId: profileIconId,
      matches: [],
      matchlist: [],
    };
  }
  return data;
}

async function createUser({
  puuid,
  name,
  profileIconId,
  summonerLevel,
}: IsUserInDBProps) {
  const user = { id: puuid, userName: name, profileIconId, summonerLevel };

  const response = await fetch("/api/database/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return;
}

async function summonerStats(summonerId: string) {
  let link = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?${key}`;

  const response = await fetch(link);
  let data: Summoner[] = await response.json();

  return data;
}

async function getMatchlist(
  puuid: string,
  allMatches: number,
  userData: Player
) {
  let start = "start=0";
  let count = "count=100";
  let counter = 0;
  const matchListArr: string[] = [];
  let link = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&${start}&${count}&${key}`;

  while (allMatches != 0) {
    if (userData.matchlist.length == 0) {
      if (allMatches < 100) {
        count = `count=${allMatches}`;
      } else {
        allMatches - 100;
      }

      start = `start=${counter * 100}`;
      counter++;
      const response = await fetch(link);
      const data: string[] = await response.json();
      matchListArr.push(...data);
    }
    const matchesLeft = allMatches - userData.matchlist.length;
    if (allMatches < 100) {
      count = `count=${matchesLeft}`;
    } else {
      allMatches - 100;
    }
    start = `start=${counter * 100}`;
    counter++;
    const response = await fetch(link);
    const data: string[] = await response.json();
    matchListArr.push(...data);
  }

  const reversedMatchlist = matchListArr.reverse();
  const combinedMatchlist = [...userData.matchlist, ...reversedMatchlist];
  const dbMatchlist = [];
  for (let i = 0; reversedMatchlist.length > i; i++) {
    dbMatchlist.push({ userId: puuid, matchId: reversedMatchlist[i] });
  }
  const response = await fetch("/api/database/createMatchlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dbMatchlist),
  });
}
