import getMatchList from "./functions/getMatchList";

const key = process.env.NEXT_PUBLIC_API_KEY;

export default async function allMatches(
  req: { query: { puuid: string; start: string; count: string } },
  res: any
) {
  if (!key) return;
  const puuid = req.query.puuid;
  const start = req.query.start;
  const count = req.query.count;
  const data = await getMatchList(puuid, start, count, key);
  res.json(data);
}
