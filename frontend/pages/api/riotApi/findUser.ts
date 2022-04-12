import getSummonerData from "./functions/getSummonerData";

const key = process.env.NEXT_PUBLIC_API_KEY;
export default async function findUser(
  req: { query: { userName: string } },
  res: any
) {
  if (!key) return;
  const userName = req.query.userName;
  const data = await getSummonerData(userName, key);
  res.json(data);
}
