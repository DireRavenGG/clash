import axios from "axios";
import { SummonerByName } from "../types/SummonerByName";

export async function findUser(name: string) {
  const encodedUrl = encodeURI(name);
  const data = await axios
    .get("/api/riotApi/findUser", {
      params: {
        userName: encodedUrl,
      },
    })
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });

  return data;
}
