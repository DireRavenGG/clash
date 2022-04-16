import { matchesCall } from "./matchesCall";
import { RateLimiter } from "limiter";
import { getUserStats } from "../utils/getUserStats";
import { matchData } from "../utils/matchData";

interface getTenMatchesProps {
  currentMatchesLength?: number;
  puuid: string;
  ssid: string;
}

interface MatchIdDataProps {
  userId: string;
  id: number;
  matchId: string;
}

const limiter = new RateLimiter({ tokensPerInterval: 2, interval: 1750 });

export async function getTenMatches({
  puuid,
  ssid,
  currentMatchesLength = 0,
}: getTenMatchesProps) {
  const matchIdData: { user: MatchIdDataProps[] } = await fetch(
    `/api/database/getMatchlistById/${puuid}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });

  const diffMatchLength = matchIdData.user.length - currentMatchesLength;

  let amountToAdd = 10;

  if (diffMatchLength < 10) {
    amountToAdd = diffMatchLength;
  }

  const matchesIdsToGet = matchIdData.user.slice(
    diffMatchLength - amountToAdd,
    diffMatchLength
  );

  const matchesRetrieved: any = [];
  const promises = [];

  for (let i = 0; i < matchesIdsToGet.length; i++) {
    promises.push(matchesCall(matchesIdsToGet[i].matchId));
  }
  const result = await Promise.all(promises);
  result.forEach((match) => {
    if (!match) {
      return;
    }

    matchesRetrieved.push(matchData(match, ssid));
  });

  return matchesRetrieved;
}

/*
  for (let i = 0; i < matchesIdsToGet.length; i++) {
    const remainingRequests = await limiter.removeTokens(1);
    console.log(remainingRequests);
    if (remainingRequests > 0) {
      const match = await matchesCall(matchesIdsToGet[i].matchId);
      if (!match) return;
      const matchStats = matchData(match, ssid);
      matchesRetrieved.push(matchStats);
    }
  }
*/
