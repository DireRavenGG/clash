var axios = require("axios");

export default function findUser(name: string, key: string) {
  let link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`;

  return axios
    .get(link, {
      method: "GET",
      headers: {
        "X-Riot-Token": key,
      },
    })
    .then((res: any) => res.data)
    .then((data: any) => {
      return data;
    })
    .catch((rejected: any) => {
      console.log(rejected);
    });
}
