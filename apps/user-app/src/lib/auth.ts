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
      id?: string;
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
          required: true,
        },
        password: {
          label: "Password",
          placeholder: "Enter your password",
          type: "password",
          required: true,
        },
      },
      async authorize(credentials) {
        if (!credentials.phone && credentials.password) {
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
        }

        return null;
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

// import db from "@repo/db/client";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";

// export const authOption = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         phone: {
//           label: "Phone number",
//           type: "text",
//           placeholder: "1231231231",
//           required: true,
//         },
//         password: { label: "Password", type: "password", required: true },
//       },
//       // TODO: User credentials type from next-aut
//       async authorize(credentials: any) {
//         // Do zod validation, OTP validation here
//         const hashedPassword = await bcrypt.hash(credentials.password, 10);
//         const existingUser = await db.users.findFirst({
//           where: {
//             number: credentials.phone,
//           },
//         });

//         if (existingUser) {
//           const passwordValidation = await bcrypt.compare(
//             credentials.password,
//             existingUser.password
//           );
//           if (passwordValidation) {
//             return {
//               id: existingUser.id.toString(),
//               name: existingUser.name,
//               email: existingUser.number,
//             };
//           }
//           return null;
//         }

//         try {
//           const user = await db.users.create({
//             data: {
//               number: credentials.phone,
//               password: hashedPassword,
//             },
//           });

//           return {
//             id: user.id.toString(),
//             name: user.name,
//             email: user.number,
//           };
//         } catch (e) {
//           console.error(e);
//         }

//         return null;
//       },
//     }),
//   ],
//   secret: process.env.JWT_SECRET || "secret",
//   callbacks: {
//     // TODO: can u fix the type here? Using any is bad
//     async session({ token, session }: any) {
//       session.user.id = token.sub;

//       return session;
//     },
//   },
// };
