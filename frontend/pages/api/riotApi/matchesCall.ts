import matchCall from "./functions/matchCall";
import { NextApiResponse } from "next";

const key = process.env.NEXT_PUBLIC_API_KEY;

export default async function matchesCall(
  req: { query: { matchId: string } },
  res: NextApiResponse
) {
  if (!key) return;
  const matchId = req.query.matchId;
  const data = await matchCall(matchId, key);

  res.json(data);
}
