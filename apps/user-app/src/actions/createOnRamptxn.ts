"use server";

import { authOption } from "@/lib/auth";
import { tokenGenerater } from "@/lib/tokenGenerater";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import axios from "axios";

export async function createOnRamptxn(to: number, provider: string) {
  const session = await getServerSession(authOption);
  const userId = Number(session?.user?.id);

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
        userId,
        amount: to * 100,
        status: "Processing",
        provider,
        token,
        startTime: new Date(),
      },
    });

    // this is becasue we need to similter the bank web hook
    const bankwebhook = await axios.post(process.env.BANKWEB_HOOK, {
      token,
      user_identifier: userId,
      amount: to * 100,
    });
    console.log(" sessus", bankwebhook?.data);

    return {
      messgae: "done",
      transaction,
    };
  } catch (error) {
    console.log(error);

    return new Error("some thin went worng");
  }
}
