import { UserInDB } from "types/ApiDB";
import { createUser } from "./createUser";

export async function isUserInDB({
  puuid,
  name,
  profileIconId,
  summonerLevel,
}: UserInDB) {
  const data = await fetch(`/api/database/searchUser/${puuid}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });

  if (data.user) {
    const matchIdData = await fetch(`/api/database/getMatchlistById/${puuid}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((rejected) => {
        console.log(rejected);
      });

    const matchesData = await fetch(`/api/database/getAllMatches/${puuid}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((rejected) => {
        console.log(rejected);
      });
    return {
      ...data.user,
      matches: [...matchesData.user],
      matchlist: [...matchIdData.user],
    };
  }

  createUser({ puuid, name, profileIconId, summonerLevel });
  return {
    id: puuid,
    userName: name,
    summonerLevel: summonerLevel,
    profileIconId: profileIconId,
    matches: [],
    matchlist: [],
  };
}
