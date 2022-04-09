import { Summoner } from "types/Summoner";
require("dotenv").config();

const key = process.env.NEXT_PUBLIC_API_KEY;

export async function summonerStats(summonerId: string) {
  if (!key) return [];
  let link = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;

  const data: Summoner[] = await fetch(link, {
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

  return data;
}
