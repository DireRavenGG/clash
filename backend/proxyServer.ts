import getMatchList from "./functions/getMatchList";
import getRank from "./functions/getRank";
import getSummonerData from "./functions/getSummonerData";
import matchCall from "./functions/matchCall";

require("dotenv").config();
var express = require("express");
var cors = require("cors");
var path = require("path")

var app = express();

app.use(cors());
app.options("*", cors());

const key = process.env.NEXT_PUBLIC_API_KEY;

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req: any, res: any) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})

app.get("/findUser", async (req: any, res: any) => {
  if (!key) return;
  const userName: string = req.query.userName;
  const data = await getSummonerData(userName, key);

  res.json(data);
});

app.get("/allMatches"),
  async (req: any, res: any) => {
    if (!key) return;
    const puuid = req.query.puuid;
    const start = req.query.start;
    const count = req.query.count;
    const data = await getMatchList(puuid, start, count, key);
    res.json(data);
  };

app.get("/rank", async (req: any, res: any) => {
  if (!key) return;
  const id = req.query.id;
  const data = await getRank(id, key);

  res.json(data);
});

app.get("/matchesCall", async (req: any, res: any) => {
  if (!key) return;
  const matchId = req.query.matchId;
  const data = await matchCall(matchId, key);

  res.json(data);
});

app.listen(4000, function () {
  console.log("server listening on port 4000");
});
export {};
