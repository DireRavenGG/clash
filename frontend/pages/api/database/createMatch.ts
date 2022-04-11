import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function createJob(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const matchData = req.body;

    const match = await prisma.match.create({
      data: {
        userId: matchData.userId,
        kills: matchData.kills,
        deaths: matchData.deaths,
        assists: matchData.assists,
        win: matchData.win,
        champion: matchData.champion,
        summonerSpell1: matchData.summonerSpell1,
        summonerSpell2: matchData.summonerSpell2,
        cs: matchData.cs,
        gameLength: matchData.gameLength,
        level: matchData.level,
        kp: matchData.kp,
      },
    });
    res.status(201);
    res.json({ match });
  } catch (e) {
    console.log(e);
    res.json({ error: "Sorry unable to add" });
  } finally {
    await prisma.$disconnect();
  }
}
