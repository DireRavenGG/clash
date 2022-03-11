import { MatchDto } from "types/MatchApi";
import { getUserStats } from "utils/getUserStats";

export const saveSingleMatches = async (match: MatchDto, ssid: string) => {
  await fetch("/api/database/createMatch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getUserStats(match, ssid)),
  });
};
