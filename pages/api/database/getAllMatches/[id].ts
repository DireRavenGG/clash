import { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function getAllMatches(
  { query: { id } }: { query: any; id: string },
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });
  const userId = id;

  try {
    const user = await prisma.player.findUnique({
      where: {
        id: userId,
      },
    });
    res.status(200);
    res.json({ user });
  } catch (e) {
    res.status(500);
    res.json({ error: "User not found" });
  } finally {
    await prisma.$disconnect();
  }
}
