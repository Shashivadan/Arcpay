"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Appbar } from "@repo/ui/appbar";

export default function AppbarClient() {
  const router = useRouter();
  const session = useSession();
  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={() => {
          signOut({ redirect: true, callbackUrl: "/api/auth/signin" });
          router.push("/api/auth/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
}
