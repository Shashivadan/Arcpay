import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "@/lib/auth";
import LandingPage from "@/components/landingPage/LandingPage";

export default async function page() {
  const session = await getServerSession(authOption);

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <LandingPage />
    </>
  );
}
