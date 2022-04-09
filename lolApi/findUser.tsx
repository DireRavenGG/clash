import { SummonerByName } from "types/SummonerByName";

const key = process.env.NEXT_PUBLIC_API_KEY;

export async function findUser(name: string) {
  if (!name || !key) return;
  let link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`;

  const data: SummonerByName = await fetch(link, {
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
