import axios from "axios";
import { SummonerByName } from "../types/SummonerByName";

export async function findUser(name: string) {
  const data = await axios
    .get("http://localhost:4000/findUser", {
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
