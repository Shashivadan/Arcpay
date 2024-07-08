import { otpGenarater } from "@/server/lib/otpGenerater";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User extends NextAuthUser {
  isVerfiyed: boolean;
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
    isVerfiyed: boolean;
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

        if (existingUser.isVerfiyed === false) {
          otpGenarater("shashivadan99@gmail.com", existingUser.name);
          throw new Error("Please verify your email");
        }

        const passwordValidation = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!passwordValidation) {
          throw new Error("Incorrect password");
        }

        return {
          id: existingUser.id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          isVerfiyed: existingUser.isVerfiyed,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isVerfiyed = (user as User).isVerfiyed;
      }
      return token;
    },
    async session({ token, session }) {
      if (token?.sub) {
        session.user = {
          ...session.user,
          id: token?.sub,
          isVerfiyed: token.isVerfiyed,
        } as User;
      }
      return session;
    },
  },
};
