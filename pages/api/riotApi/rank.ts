import { NextApiResponse } from "next";
import getRank from "./functions/getRank";

const key = process.env.NEXT_PUBLIC_API_KEY;
export default async function findUser(
  req: { query: { id: string } },
  res: NextApiResponse
) {
  if (!key) return;
  const id = req.query.id;
  const data = await getRank(id, key);

  res.json(data);
}
