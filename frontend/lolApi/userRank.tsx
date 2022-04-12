import axios from "axios";
import { Summoner } from "../types/Summoner";
import { findUser } from "./findUser";
const key = process.env.NEXT_PUBLIC_API_KEY;
export async function userRank(name: string) {
  const data = await findUser(name);
  if (!name || !key || !data) return;

  const rank: Summoner[] = await axios
    .get("/api/riotApi/rank", {
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
