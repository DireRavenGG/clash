import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function createJob(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const matchData = req.body;

    const match = await prisma.match.createMany({
      data: [...matchData],
    });
    res.status(201);
    res.json({ match });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: "Sorry unable to add" });
  } finally {
    await prisma.$disconnect();
  }
}
