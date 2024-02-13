import Image from "next/image";
import googleLogo from "@/public/google.png";
import {
  CredentialsSignInButton,
  GoogleSignInButton,
} from "@/components/authButtons";
import SignoutButton from "@components/signOutButton";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CredentialForm } from "@/components/credentialForm";
import { SignUpForm } from "@/components/signUpForm";
import { getCsrfToken } from "next-auth/react";

export default async function SignInPage() {
  const session = await getServerSession(authConfig);

  console.log("Session: ", session);

  if (!session) return redirect("/login");

  return (
    <div>
      <SignoutButton />
    </div>
  );
}