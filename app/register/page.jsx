import { GoogleSignInButton } from '@components/authButtons';
import { SignUpForm } from '@components/signUpForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center mt-10 p-10 shadow-md">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Sign Up</h1>
        <GoogleSignInButton />
        <span className="text-2xl font-semibold text-black text-center mt-8">
          Or
        </span>
        {/* <CredentialsSignInButton /> */}
        <SignUpForm />
      </div>
    </div>
  );
}