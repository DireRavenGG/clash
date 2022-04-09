import { MatchDto } from "types/MatchApi";
require("dotenv").config();

const key = process.env.NEXT_PUBLIC_API_KEY;

export async function matchesCall(matchId: string) {
  if (!key) return;
  const link = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`;
  const data: MatchDto = await fetch(link, {
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
  console.log(data);
  return data;
}
