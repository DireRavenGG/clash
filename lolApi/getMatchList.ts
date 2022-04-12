import axios from "axios";
import { Player } from "../types/ApiDB";
require("dotenv").config();

const key = process.env.NEXT_PUBLIC_API_KEY;

export async function getMatchlist(
  puuid: string,
  allMatches: number,
  userData: Player
) {
  if (!key) return [];
  let start = "start=0";
  let count = "count=100";
  let counter = 0;
  const matchListArr: any[] = [];

  while (allMatches > 0) {
    if (userData.matchlist.length == 0) {
      if (allMatches < 100) {
        count = `count=${allMatches}`;
        allMatches = 0;
      } else {
        allMatches -= 100;
      }

      start = `start=${counter * 100}`;
      counter++;
      console.log(`${start}`);
      console.log(`${count}`);

      const data = await axios
        .get("/api/riotApi/allMatches", {
          params: {
            puuid: puuid,
            start: start,
            count: count,
          },
        })
        .then((res) => res.data)
        .catch(function (error) {
          console.log(error);
        });

      matchListArr.push(...data);
    } else {
      const matchesLeft = allMatches - userData.matchlist.length;

      if (matchesLeft != 0) {
        if (matchesLeft < 100) {
          count = `count=${matchesLeft}`;
          allMatches = 0;
        } else {
          allMatches -= 100;
        }
        console.log(count);
        start = `start=${counter * 100}`;
        counter++;

        const data = await axios
          .get("/api/riotApi/allMatches", {
            params: {
              puuid: puuid,
              start: start,
              count: count,
            },
          })
          .then((res) => res.data)
          .catch(function (error) {
            console.log(error);
          });

        matchListArr.push(...data);
      } else {
        allMatches = 0;
      }
    }
  }
  const reversedMatchlist = matchListArr.reverse();

  const dbMatchlist = [];
  for (let i = 0; reversedMatchlist.length > i; i++) {
    dbMatchlist.push({ userId: puuid, matchId: reversedMatchlist[i] });
  }
  await fetch("/api/database/createMatchlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dbMatchlist),
  });

  let combinedMatchlist = [...dbMatchlist];
  if (userData.matchlist) {
    combinedMatchlist = [...userData.matchlist, ...dbMatchlist];
  }

  return combinedMatchlist;
}
