import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function createMatchlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const { matchId: matchData } = req.body;

    const matchId = await prisma.matchId.createMany({
      data: [...matchData],
    });
    res.status(201);
    res.json({ matchId });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: "Sorry unable to add" });
  } finally {
    await prisma.$disconnect();
  }
}
