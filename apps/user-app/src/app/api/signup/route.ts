import { NextRequest, NextResponse } from "next/server";
import { signUpFormSchema } from "@/types/authTypes";
import z from "zod";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { otpGenarater } from "@/server/lib/otpGenerater";

export async function POST(req: NextRequest) {
  try {
    const {
      password,
      phoneNumber,
      email,
      username,
    }: z.infer<typeof signUpFormSchema> = await req.json();

    const isExisting = await prisma.users.findFirst({
      where: {
        OR: [{ number: phoneNumber }, { email }],
      },
    });

    if (isExisting) {
      if (isExisting.isVerfiyed === false) {
        const { success, otp, message } = await otpGenarater(
          "shashivadan99@gmail.com",
          isExisting.name
        );

        if (!success) {
          return NextResponse.json(
            {
              message,
              success,
            },
            { status: 400 }
          );
        }
        const hashOtp = await bcrypt.hash(JSON.stringify(otp), 10);
        await prisma.otpVerify.update({
          where: {
            email: isExisting.email,
          },
          data: {
            otp: hashOtp,
            expries: new Date(Date.now() + 10 * 60 * 1000),
          },
        });
        return NextResponse.json(
          {
            otpVerify: true,
            success: true,
            message: "Otp is send to your account",
          },
          { status: 201 }
        );
      }
      return NextResponse.json(
        { message: "email or number are already exist", success: false },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const createAccount = await prisma.$transaction(async (tx) => {
      const createUser = await tx.users.create({
        data: {
          number: phoneNumber,
          email,
          password: hashPassword,
          name: username,
          Balance: {
            create: {
              amount: 0,
              locked: 0,
            },
          },
        },
        select: {
          name: true,
          email: true,
          number: true,
          id: true,
        },
      });
      return createUser;
    });

    if (!createAccount) {
      return NextResponse.json(
        {
          message: "some thing went worng",
          success: false,
        },
        { status: 400 }
      );
    }
    const { success, otp, message } = await otpGenarater(
      "shashivadan99@gmail.com",
      createAccount.name
    );

    if (!success) {
      return NextResponse.json(
        {
          message,
          success,
        },
        { status: 400 }
      );
    }

    const hashOtp = await bcrypt.hash(JSON.stringify(otp), 10);

    const otpPrsima = await prisma.otpVerify.create({
      data: {
        email: createAccount.email,
        otp: hashOtp,
        expries: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("serroro ", error);
    return NextResponse.json(
      { messges: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
