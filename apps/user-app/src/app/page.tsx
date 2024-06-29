"use client";

import prisma from "@repo/db/client";

import { useBalance } from "@repo/store/balance";

export default function Home() {
  const value = useBalance();
  return <main className=" text-black">hi there {value} </main>;
}
