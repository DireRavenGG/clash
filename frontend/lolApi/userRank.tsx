import axios from "axios";
import { Summoner } from "../types/Summoner";
import { findUser } from "./findUser";
const key = process.env.NEXT_PUBLIC_API_KEY;
export async function userRank(name: string) {
  const data = await findUser(name);
  if (!name || !key || !data) return;
  let link = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}`;

  // const rank: Summoner[] = await fetch(link, {
  //   method: "GET",
  //   headers: {
  //     "X-Riot-Token": key,
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     return data;
  //   })
  //   .catch((rejected) => {
  //     console.log(rejected);
  //   });

  const rank: Summoner[] = await axios
    .get("http://localhost:4000/rank", {
      params: {
        id: data.id,
      },
    })
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });

  const soloq = rank.filter((ranked) => ranked.queueType === "RANKED_SOLO_5x5");
  const solo = soloq[0];

  return {
    summonerData: data,
    rank: solo,
  };
}
