import { MatchDto } from "types/MatchApi";
require("dotenv").config();

const key = process.env.API_KEY;

export async function matchesCall(matchId: string) {
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
