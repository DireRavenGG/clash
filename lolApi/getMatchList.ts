import { Player } from "types/ApiDB";
require("dotenv").config();

const key = process.env.API_KEY;

export async function getMatchlist(
  ssid: string,
  puuid: string,
  allMatches: number,
  userData: Player
) {
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
      const data = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&${start}&${count}&${key}`
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((rejected) => {
          console.log(rejected);
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

        const data = await fetch(
          `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&${start}&${count}&${key}`
        )
          .then((res) => res.json())
          .then((data) => {
            return data;
          })
          .catch((rejected) => {
            console.log(rejected);
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
    dbMatchlist.push({ userId: ssid, matchId: reversedMatchlist[i] });
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
