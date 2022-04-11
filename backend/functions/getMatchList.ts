import axios from "axios";

export default function getMatchList(
  puuid: string,
  start: number,
  count: number,
  key: string
) {
  return axios
    .get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&${start}&${count}`,
      {
        method: "GET",
        headers: {
          "X-Riot-Token": key,
        },
      }
    )
    .then((res) => res.data)
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });
}
