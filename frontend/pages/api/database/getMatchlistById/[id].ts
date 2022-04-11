import { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function getAllMatches(
  { query: { id } }: { query: any },
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });
  const userId: string = id;

  console.log(123, userId);

  try {
    const user = await prisma.matchId.findMany({
      where: {
        userId: userId,
      },
    });

    console.log(user);

    res.status(200);
    res.json({ user });
  } catch (e) {
    res.status(500);
    res.json({ error: "User not found" });
  } finally {
    await prisma.$disconnect();
  }
}
