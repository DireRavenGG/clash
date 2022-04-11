import { PlayerDto } from "types/ClashById";
require("dotenv").config();

const key = process.env.NEXT_PUBLIC_API_KEY;

export async function getTeamId(uuid: string) {
  if (!key) return "";
  const link = `https://na1.api.riotgames.com/lol/clash/v1/players/by-summoner/${uuid}`;

  const data: PlayerDto[] = await fetch(link, {
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
  const teamId = data[0].teamId;
  return teamId;
}
