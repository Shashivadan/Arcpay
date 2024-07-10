import prisma from "@repo/db/client";
import NextAuth from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface ReqTpye {
  pin: string;
  username: string;
}
export async function POST(req: NextRequest) {
  const { pin, username }: ReqTpye = await req.json();
  console.log(pin, username);

  if (!pin || !username) {
    return NextResponse.json({
      susses: false,
      message: "plase provide a both pin and usernmae",
    });
  }

  const user = await prisma.otpVerify.findFirst({
    where: {
      email: username,
    },
  });

  if (!user)
    return NextResponse.json(
      { success: false, message: "user does not exist" },
      { status: 401 }
    );

  const verify = await bcrypt.compare(pin, user.otp);

  const isCodeNotExpired = new Date(user.expries) > new Date();

  if (verify && isCodeNotExpired) {
    const verifyed = await prisma.users.update({
      where: {
        email: username,
      },
      data: {
        isVerfiyed: true,
      },
    });
    return NextResponse.json({ succes: true, message: "otp is succesfull" });
  }
  if (!isCodeNotExpired) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Verification code has expired. Please sign up again to get a new code.",
      },
      { status: 401 }
    );
  }
  if (!verify) {
    return NextResponse.json(
      { success: false, message: "Incorrect verification code" },
      { status: 401 }
    );
  }
}
