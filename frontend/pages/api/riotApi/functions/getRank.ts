import axios from "axios";

export default async function getRank(id: string, key: string) {
  let link = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`;
  return axios
    .get(link, {
      method: "GET",
      headers: {
        "X-Riot-Token": key,
      },
    })
    .then((res) => res.data)
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });
}
