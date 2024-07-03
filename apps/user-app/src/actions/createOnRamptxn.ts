"use server";

import { authOption } from "@/lib/auth";
import { tokenGenerater } from "@/lib/tokenGenerater";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

export async function createOnRamptxn(to: number, provider: string) {
  const session = await getServerSession(authOption);
  // const userId = session.user.id;

  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  if (!provider) {
    return { message: " select a provider" };
  }
  const token = tokenGenerater();
  try {
    const transaction = await prisma.onRampTransaction.create({
      data: {
        userId: Number(session?.user?.id),
        amount: to * 100,
        status: "Processing",
        provider,
        token,
        startTime: new Date(),
      },
    });

    return {
      messgae: "done",
      transaction,
    };
  } catch (error) {
    console.log(error);

    return new Error("some thin went worng");
  }
}
