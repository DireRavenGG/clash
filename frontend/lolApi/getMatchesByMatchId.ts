import { MatchIdArr, Player } from "types/ApiDB";
import { MatchDto } from "../types/MatchApi";
import { matchesCall } from "./matchesCall";
import { saveSingleMatches } from "./saveSingleMatches";
import { getMatchesFromDB } from "./getMatchesFromDB";

// comeup with better logic for not hitting rate limits.

export async function getMatchByMatchId(
  matchIdArr: MatchIdArr[],
  userData: Player,
  ssid: string
) {
  let diffMatchesSaved = matchIdArr.length - userData.matches.length;

  const matchesArr: MatchDto[] = [];

  if (diffMatchesSaved > 0) {
    const matchIdMinusOne = matchIdArr.length;
    const start = matchIdMinusOne - diffMatchesSaved;
    const newMatchIds = matchIdArr.slice(start, matchIdMinusOne);
    console.log(`New Match: ${newMatchIds.length}`);
    console.log(`MatchIdsMinusOne: ${start}`);
    let i = 0;
    var interval = setInterval(async () => {
      if (i < newMatchIds.length) {
        let match = await matchesCall(newMatchIds[i].matchId);
        if (match == undefined) return;
        matchesArr.push(match);
        saveSingleMatches(match, ssid);

        i++;
      } else {
        clearInterval(interval);
        const matches: any[] = await getMatchesFromDB(userData);
        return matches;
      }
    }, 5500);
  } else {
    const matches: any[] = userData.matches;
    return matches;
  }
}
