import express, { Express, Response, Request } from "express";

import prisma from "@repo/db/client";

const app: Express = express();

interface ReqType {
  token: string;
  userId: string;
  amount: string;
}

app.post("/hdfcWebhook", async (req: Request, res: Response) => {
  //TODO: Add zod validation here?
  const paymentInformation: ReqType = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  if (!paymentInformation)
    return res.status(411).json({ message: "Some thing want wrong" });
  // Update balance in db, add txn
  try {
    const transaction = await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({
      message: "Success",
    });
  } catch (error) {
    console.error(error);
    prisma.onRampTransaction.update({
      where: {
        token: paymentInformation.token,
      },
      data: {
        status: "Failure",
      },
    });
    res
      .status(500)
      .json({ message: "Internal Server Error While handleing Web hook" });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`server port on ${process.env.PORT}`);
});
