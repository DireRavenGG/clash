import axios from "axios";

export default async function getRank(matchId: string, key: string) {
  const link = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`;
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
