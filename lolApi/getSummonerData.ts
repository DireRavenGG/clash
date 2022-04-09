import { Summoner } from "types/Summoner";
require("dotenv").config();

const key = process.env.API_KEY;

export async function summonerStats(summonerId: string) {
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
