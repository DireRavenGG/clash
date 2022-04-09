import { PlayerDto } from "types/ClashById";
require("dotenv").config();

const key = process.env.API_KEY;

export async function getTeamId(uuid: string) {
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
