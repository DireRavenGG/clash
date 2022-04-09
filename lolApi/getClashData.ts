import { ClashPlayerDto, TeamDto } from "types/ClashTeam";
import { getChampStats } from "utils/getChampStats";
import { isUserInDB } from "./isUserInDB";
import { getTeamId } from "./getTeamId";
import { summonerStats } from "./getSummonerData";
import { getMatchlist } from "./getMatchList";
import { getMatchByMatchId } from "./getMatchesByMatchId";

require("dotenv").config();

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

const key = process.env.NEXT_PUBLIC_API_KEY;

export async function getClashData(name: string) {
  if (!key) return;
  // Hardcoded to NA could make it work with diff regions
  let link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`;

  const data = await fetch(link, {
    method: "GET",
    headers: {
      "X-Riot-Token": key,
    },
  })
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
      bySIDData.puuid,
      allMatches,
      userData
    );

    const matches = await getMatchByMatchId(
      allMatchIds,
      userData,
      player.summonerId
    );

    const champStats = await getChampStats(matches!);

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
