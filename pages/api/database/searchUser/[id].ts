import { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function fetchUser(
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
    res.json({ user: true });
  } finally {
    await prisma.$disconnect();
  }
}
