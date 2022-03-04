import { getUserStats } from "utils/getUserStats";
import { Summoner } from "../types/Summoner";
import { killParticipation } from "utils/stats";
import { PlayerDto } from "../types/ClashById";
import { TeamDto } from "types/ClashTeam";

import Bottleneck from "bottleneck";
import { LolApi, Constants } from "twisted";
import { RegionGroups } from "twisted/dist/constants";
import { ApiResponseDTO, MatchV5DTOs } from "twisted/dist/models-dto";
import { MatchDto } from "../types/MatchApi";

const api = new LolApi({
  rateLimitRetry: true,
  key: "RGAPI-49063dea-32b5-4095-a11b-3a4f9fe4d47b",
});
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

interface SummonerDto {
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  name: string;
  id: string;
  puuid: string;
  summonerLevel: number;
}
const key = "api_key=RGAPI-49063dea-32b5-4095-a11b-3a4f9fe4d47b";

export async function getSummonerId(name: string) {
  // Hardcoded to NA could make it work with diff regions
  let link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${key}`;

  const data = await fetch(link)
    .then((res) => res.json())
    .then((data) => {
      console.log(1);
      console.log(data);
      return data;
    })
    .catch((rejected) => {
      console.log(2);
      console.log(rejected);
    });

  const teamId = await getTeamId(data.id);

  const wholeTeam = await getAllPlayers(teamId);

  const playerArr = wholeTeam.playerArr;

  console.log(wholeTeam);
  const arr = [];

  playerArr.map(async (player) => {
    let bySIDLink = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/${player.summonerId}?${key}`;

    const bySIDData = await fetch(bySIDLink)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((rejected) => {
        console.log(rejected);
      });

    const userData = await isUserInDB({
      puuid: player.summonerId,
      name: bySIDData.name,
      profileIconId: bySIDData.profileIconId,
      summonerLevel: bySIDData.summonerLevel,
    });

    const summoner = await summonerStats(player.summonerId);

    const soloQueueArr = summoner.filter(
      (ranked) => ranked.queueType === "RANKED_SOLO_5x5"
    );

    const soloQueue = soloQueueArr[0];

    const allMatches = soloQueue.wins + soloQueue.losses;

    const allMatchIds = await getMatchlist(
      player.summonerId,
      bySIDData.puuid,
      allMatches,
      userData
    );

    const matches = await getMatchByMatchId(
      allMatchIds,
      userData,
      player.summonerId
    );
    // arr.push({
    //   name: bySIDData.name,
    //   profileIconId: bySIDData.profileIconId,
    //   summonerLevel: bySIDData.summonerLevel,
    //   rank: soloQueue.rank,
    //   lp: soloQueue.leaguePoints,
    //   tier: soloQueue.tier,
    //   matchesArr: matches,
    // });
    return;
  });

  return {};
}
export async function isUserInDB({
  puuid,
  name,
  profileIconId,
  summonerLevel,
}: IsUserInDBProps) {
  const data = await fetch(`/api/database/searchUser/${puuid}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(`inUserDB: ${data}`);
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });
  console.log(data);
  if (!data.user) {
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
  console.log(`fishy fish ${data.user}`);
  return data.user;
}

async function createUser({
  puuid,
  name,
  profileIconId,
  summonerLevel,
}: IsUserInDBProps) {
  const user = {
    id: puuid,
    userName: name,
    profileIconId: profileIconId,
    summonerLevel: summonerLevel,
  };

  await fetch("/api/database/createUser", {
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

  const data: Summoner[] = await fetch(link)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });

  return data;
}

async function getMatchlist(
  ssid: string,
  puuid: string,
  allMatches: number,
  userData: Player
) {
  let start = "start=0";
  let count = "count=100";
  let counter = 0;
  const matchListArr: string[] = [];
  console.log(userData);

  while (allMatches != 0) {
    if (!userData.matchlist) {
      if (allMatches < 100) {
        count = `count=${allMatches}`;
        allMatches = 0;
      } else {
        allMatches -= 100;
      }

      start = `start=${counter * 100}`;
      counter++;

      const data = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&${start}&${count}&${key}`
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((rejected) => {
          console.log(rejected);
        });

      matchListArr.push(...data);
    } else {
      const matchesLeft = allMatches - userData.matchlist.length;
      if (allMatches < 100) {
        count = `count=${matchesLeft}`;
        allMatches = 0;
      } else {
        allMatches -= 100;
      }
      start = `start=${counter * 100}`;
      counter++;

      const data = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&${start}&${count}&${key}`
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((rejected) => {
          console.log(rejected);
        });

      matchListArr.push(...data);
    }
  }
  const reversedMatchlist = matchListArr.reverse();
  let combinedMatchlist = [...reversedMatchlist];
  if (userData.matchlist) {
    combinedMatchlist = [...userData.matchlist, ...reversedMatchlist];
  }

  console.log(ssid);

  const dbMatchlist = [];
  for (let i = 0; reversedMatchlist.length > i; i++) {
    dbMatchlist.push({ userId: ssid, matchId: reversedMatchlist[i] });
  }
  await fetch("/api/database/createMatchlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dbMatchlist),
  });

  return combinedMatchlist;
}

async function getMatchByMatchId(
  matchIdArr: string[],
  userData: Player,
  ssid: string
) {
  let diffMatchesSaved = matchIdArr.length;
  if (userData.matches) {
    diffMatchesSaved = userData.matches.length - matchIdArr.length;
  }

  const matchesArr: MatchV5DTOs.MatchDto[] = [];
  if (diffMatchesSaved !== 0) {
    const matchIdMinusOne = matchIdArr.length - 1;
    const start = diffMatchesSaved - matchIdMinusOne - 1;
    const newMatchIds = matchIdArr.slice(start, matchIdMinusOne);
    newMatchIds.forEach(async (matchId) => {
      let match = await matchesCall(matchId);
      matchesArr.push(match);
    });
  }

  const data = await fetch(`/api/database/getAllMatches/${userData.id}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });

  const formatedArr = [];

  for (let i = 0; matchesArr.length > i; i++) {
    const finalObj = {
      ...getUserStats(matchesArr[i], ssid),
      ...{ kp: killParticipation(matchesArr[i], ssid) },
    };
    formatedArr.push(finalObj);
  }

  await fetch("/api/database/createMatch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formatedArr),
  });
  const combinedMatches = [...data, ...formatedArr];

  return combinedMatches;
}

async function getTeamId(uuid: string) {
  const link = `https://na1.api.riotgames.com/lol/clash/v1/players/by-summoner/${uuid}?${key}`;

  const data: PlayerDto[] = await fetch(link)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });

  return data[0].teamId;
}

async function getAllPlayers(teamId: string) {
  const link = `https://na1.api.riotgames.com/lol/clash/v1/teams/${teamId}?${key}`;
  const data: TeamDto = await fetch(link)
    .then((res) => res.json())
    .then((data) => {
      console.log(`getAllPlayers${data}`);
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });

  return {
    name: data.name,
    iconId: data.iconId,
    tier: data.tier,
    abbreviation: data.abbreviation,
    playerArr: data.players,
  };
}

async function matchesCall(matchId: string) {
  return (await api.MatchV5.get(matchId, RegionGroups.AMERICAS)).response;
}
