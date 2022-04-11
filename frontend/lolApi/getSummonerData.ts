import axios from "axios";
import { Summoner } from "types/Summoner";
require("dotenv").config();

const key = process.env.NEXT_PUBLIC_API_KEY;

export async function summonerStats(summonerId: string) {
  if (!key) return [];

  const data: Summoner[] = await axios
    .get("http://localhost:4000/rank", {
      params: {
        id: summonerId,
      },
    })
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });
  console.log(data);
  return data;
}
