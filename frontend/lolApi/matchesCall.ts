import axios from "axios";
import { MatchDto } from "types/MatchApi";
require("dotenv").config();

export async function matchesCall(matchId: string) {
  const data: MatchDto = await axios
    .get("http://localhost:4000/matchesCall", {
      params: {
        matchId: matchId,
      },
    })
    .then((res) => res.data)
    .then((data) => {
      return data;
    })
    .catch((rejected) => {
      console.log(rejected);
    });

  return data;
}
