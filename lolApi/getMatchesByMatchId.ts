import { MatchIdArr, Player } from "types/ApiDB";
import { MatchDto } from "types/MatchApi";
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
        matchesArr.push(match);
        saveSingleMatches(match, ssid);

        i++;
      } else {
        clearInterval(interval);
      }
    }, 5500);
    const matches: any[] = await getMatchesFromDB(userData);
    return matches;
  } else {
    const matches: any[] = userData.matches;
    return matches;
  }
}
