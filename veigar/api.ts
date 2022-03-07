import { getUserStats } from "utils/getUserStats";
import { Summoner } from "../types/Summoner";
import { PlayerDto } from "../types/ClashById";
import { ClashPlayerDto, TeamDto } from "types/ClashTeam";
import { MatchDto } from "../types/MatchApi";
import { getChampStats } from "utils/getChampStats";
import { Match } from "@prisma/client";
import { SrvRecord } from "dns";

interface MatchIdArr {
  id?: number;
  matchId: string;
  userId: string;
}

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
  matchlist: MatchIdArr[];
}

export interface ChampStatsProps {
  champion: string;
  stats: {
    matches: number;
    wins: number;
    kills: number;
    deaths: number;
    assists: number;
    cs: number;
  };
}

const key = process.env.API_KEY;

export async function getSummonerId(name: string) {
  // Hardcoded to NA could make it work with diff regions
  let link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?${key}`;

  const data = await fetch(link)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });

  const teamId = await getTeamId(data.id);

  const wholeTeam = await getAllPlayers(teamId);

  const playerArr = wholeTeam.playerArr;

  const done = lottaShit(playerArr);

  return Promise.allSettled(done).then((results) => results);
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
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });

  const matchIdData = await fetch(`/api/database/getMatchlistById/${puuid}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });

  const matchesData = await fetch(`/api/database/getAllMatches/${puuid}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });

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

  return {
    ...data.user,
    matches: [...matchesData.user],
    matchlist: [...matchIdData.user],
  };
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
  const matchListArr: any[] = [];

  while (allMatches > 0) {
    if (userData.matchlist.length == 0) {
      if (allMatches < 100) {
        count = `count=${allMatches}`;
        allMatches = 0;
      } else {
        allMatches -= 100;
      }

      start = `start=${counter * 100}`;
      counter++;
      console.log(`${start}`);
      console.log(`${count}`);
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

      if (matchesLeft != 0) {
        if (matchesLeft < 100) {
          count = `count=${matchesLeft}`;
          allMatches = 0;
        } else {
          allMatches -= 100;
        }
        console.log(count);
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
        allMatches = 0;
      }
    }
  }
  const reversedMatchlist = matchListArr.reverse();

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

  let combinedMatchlist = [...dbMatchlist];
  if (userData.matchlist) {
    combinedMatchlist = [...userData.matchlist, ...dbMatchlist];
  }

  return combinedMatchlist;
}

async function getMatchByMatchId(
  matchIdArr: MatchIdArr[],
  userData: Player,
  ssid: string
) {
  let diffMatchesSaved = matchIdArr.length - userData.matches.length;

  const matchesArr: MatchDto[] = [];

  if (diffMatchesSaved > 0) {
    const matchIdMinusOne = matchIdArr.length;
    const start = matchIdMinusOne - diffMatchesSaved;
    const newMatchIds = matchIdArr.slice(start, matchIdMinusOne);
    console.log(`New Match: ${newMatchIds.length}`);
    console.log(`MatchIdsMinusOne: ${start}`);
    let i = 0;
    var interval = setInterval(async () => {
      if (i < newMatchIds.length) {
        let match = await matchesCall(newMatchIds[i].matchId);
        matchesArr.push(match);
        saveSingleMatches(match, ssid);

        i++;
      } else {
        clearInterval(interval);
      }
    }, 5500);
    const matches: Match[] = await getMatchesFromDB(userData);
    return matches;
  } else {
    const matches: Match[] = userData.matches;
    return matches;
  }
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
  const teamId = data[0].teamId;
  return teamId;
}

async function getAllPlayers(teamId: string) {
  const link = `https://na1.api.riotgames.com/lol/clash/v1/teams/${teamId}?${key}`;
  const data: TeamDto = await fetch(link)
    .then((res) => res.json())
    .then((data) => {
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
  const link = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?${key}`;
  const data: MatchDto = await fetch(link)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });
  console.log(data);
  return data;
}

async function getMatchesFromDB(userData: Player) {
  const data: Match[] = await fetch(
    `/api/database/getAllMatches/${userData.id}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });
  return data;
}

const saveSingleMatches = async (match: MatchDto, ssid: string) => {
  await fetch("/api/database/createMatch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getUserStats(match, ssid)),
  });
};

const lottaShit = (playerArr: ClashPlayerDto[]) => {
  return playerArr.map(async (player) => {
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

    const matches: Match[] = await getMatchByMatchId(
      allMatchIds,
      userData,
      player.summonerId
    );

    const champStats = await getChampStats(matches);

    return {
      name: bySIDData.name,
      profileIconId: bySIDData.profileIconId,
      summonerLevel: bySIDData.summonerLevel,
      rank: soloQueue.rank,
      lp: soloQueue.leaguePoints,
      tier: soloQueue.tier,
      wins: soloQueue.wins,
      losses: soloQueue.losses,
      champStats: champStats,
    };
  });
};
