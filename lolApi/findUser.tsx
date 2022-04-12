import axios from "axios";
import { SummonerByName } from "../types/SummonerByName";

export async function findUser(name: string) {
  const data = await axios
    .get("/api/riotApi/findUser", {
      params: {
        userName: name,
      },
    })
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });
  console.log(data);
  return data;
}
