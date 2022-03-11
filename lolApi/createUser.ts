import { UserInDB } from "types/ApiDB";

export async function createUser({
  puuid,
  name,
  profileIconId,
  summonerLevel,
}: UserInDB) {
  const user = {
    id: puuid,
    userName: name,
    profileIconId: profileIconId,
    summonerLevel: summonerLevel,
  };

  await fetch("/api/database/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return;
}
