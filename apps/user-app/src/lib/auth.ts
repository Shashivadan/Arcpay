import { otpGenarater } from "@/server/lib/otpGenerater";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User extends NextAuthUser {
  isVerified: boolean;
  number: string;
}

type Credentials = {
  email: string;
  password: string;
};

declare module "next-auth" {
  interface Session {
    user: User;
  }
  interface JWT {
    isVerified: boolean;
  }
}

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          placeholder: "1234567890",
          type: "text",
          required: true,
        },
        password: {
          label: "Password",
          placeholder: "Enter your password",
          type: "password",
          required: true,
        },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password");
        }

        const { email, password } = credentials;
        const existingUser = await prisma.users.findFirst({
          where: { email },
        });

        if (!existingUser) {
          throw new Error("No user found with this email");
        }

        const passwordValidation = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!passwordValidation) {
          throw new Error("Incorrect password");
        }

        if (!existingUser.isVerfiyed) {
          const otp = 796248;

          // Uncomment this when ready to use real OTP generation
          // const otp = await otpGenarater(
          //   "shashivadan99@gmail.com",
          //   existingUser.name
          // );

          const hashOtp = await bcrypt.hash(JSON.stringify(otp), 10);
          await prisma.otpVerify.update({
            where: { email: existingUser.email },
            data: {
              otp: hashOtp,
              expries: new Date(Date.now() + 10 * 60 * 1000),
            },
          });
          throw new Error("NeedVerificaion");
        }

        // Always return the user, even if not verified
        return {
          id: existingUser.id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          isVerified: existingUser.isVerfiyed,
          number: existingUser.number,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isVerified = (user as User).isVerified;
        token.number = (user as User).number;
      }
      return token;
    },
    async session({ token, session }) {
      if (token?.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
          isVerified: token.isVerified,
          number: token.number,
        } as User;
      }
      return session;
    },
    async signIn({ user }) {
      if (!(user as User).isVerified) {
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
