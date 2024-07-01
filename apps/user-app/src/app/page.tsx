import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "@/lib/auth";

export default async function page() {
  const session = await getServerSession(authOption);

  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}
