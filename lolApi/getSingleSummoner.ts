import { findUser } from "./findUser";
import { getMatchlist } from "./getMatchList";
import { summonerStats } from "./getSummonerData";
import { getTenMatches } from "./getTenMatches";
import { isUserInDB } from "./isUserInDB";

export async function getSingleSummoner(name: string) {
  const data = await findUser(name);
  if (!data) return;
  const userData = await isUserInDB({
    puuid: data.puuid,
    name: data.name,
    profileIconId: data.profileIconId,
    summonerLevel: data.summonerLevel,
  });

  const summoner = await summonerStats(data.id);

  const soloQueueArr = summoner.filter(
    (ranked) => ranked.queueType === "RANKED_SOLO_5x5"
  );

  const soloQueue = soloQueueArr[0];

  const allMatches = soloQueue.wins + soloQueue.losses;

  const allMatchIds = await getMatchlist(data.puuid, allMatches, userData);

  const tenMatches = await getTenMatches({ puuid: data.puuid, ssid: data.id });

  return tenMatches;
}
