import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function createJob(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const { player: playerData } = req.body;
    console.log("player", playerData.name);

    const player = await prisma.player.create({
      data: {
        id: playerData.id,
        userName: playerData.userName,
        summonerLevel: playerData.summonerLevel,
        profileIconId: playerData.profileIconId,
      },
    });
    res.status(201);
    res.json({ player });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: "Sorry unable to add" });
  } finally {
    await prisma.$disconnect();
  }
}
