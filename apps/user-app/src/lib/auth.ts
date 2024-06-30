import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { log } from "console";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  number: string;
};

type Credentials = {
  phone: string;
  password: string;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone Number",
          placeholder: "1234567890",
          type: "text",
        },
        password: {
          label: "Password",
          placeholder: "Enter your password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { phone, password } = credentials as Credentials;
        const existingUser = await prisma.users.findFirst({
          where: { number: phone },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
        }

        try {
          const hashPassword = await bcrypt.hash(password, 10);

          const user = await prisma.users.create({
            data: {
              number: phone,
              password: hashPassword,
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
