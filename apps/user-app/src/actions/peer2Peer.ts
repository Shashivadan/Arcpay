"use server";

import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOption } from "@/lib/auth";

export async function peer2Peer(to: string, amount: number) {
  const session = await getServerSession(authOption);
  const from = session?.user?.id;

  const descmailAmount = amount * 100;

  if (!from) {
    return new Error("user is not logged");
  }

  const toUser = await prisma.users.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) return { error: "no user id exist on this number" };

  try {
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

      const frombalane = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });
      if (!frombalane || frombalane.amount < descmailAmount) {
        throw new Error("Insufficient funds");
      }
      await tx.balance.update({
        where: {
          userId: Number(from),
        },
        data: {
          amount: {
            decrement: descmailAmount,
          },
        },
      });
      await tx.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: {
            increment: descmailAmount,
          },
        },
      });
      await tx.p2pTransfer.create({
        data: {
          amount,
          timestamp: new Date(),
          fromUserId: Number(from),
          toUserId: Number(toUser.id),
        },
      });
    });

    return {
      message: "transaction sussessfull",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "some thing went worng",
    };
  }
}
