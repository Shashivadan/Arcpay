"use client";

import { useBalance } from "@repo/store/balance";
import { Appbar } from "@repo/ui/appbar";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const value = useBalance();
  const session = useSession();
  return (
    <main className=" text-black ">
      <div className=" bg-slate-500">balance : {value}</div>
    </main>
  );
}
