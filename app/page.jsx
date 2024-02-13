
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getCsrfToken } from "next-auth/react";
import { getServerSession } from "next-auth";
//import { useRouter } from "next/router";


export default async function SignInPage() {
  const session = await getServerSession(authConfig);
  //const router = useRouter();

  console.log("Session: ", session);

  if (!session) return redirect("/login");
  
  return redirect("/dashboard")
}