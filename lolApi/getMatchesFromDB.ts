import { Player } from "../types/ApiDB";

export async function getMatchesFromDB(userData: Player) {
  const data: any[] = await fetch(`/api/database/getAllMatches/${userData.id}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });
  return data;
}
