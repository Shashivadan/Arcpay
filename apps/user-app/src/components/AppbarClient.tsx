"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Appbar } from "@repo/ui/appbar";

export default function AppbarClient() {
  const router = useRouter();
  const session = useSession();
  console.log(session);

  return (
    <div>
      <Appbar
        onSignin={() => {
          router.push("/signin");
        }}
        onSignout={async () => {
          await signOut();
          router.push("/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
}
