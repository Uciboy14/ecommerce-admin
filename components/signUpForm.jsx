"use client"

// import the signUp function from next-auth/react
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";


export function SignUpForm() {
  // use the same router and error state as the login form
  const router = useRouter();
  const [error, setError] = useState(null);

  // define a signup function that takes the form data and calls the signUp function
  const signup = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // pass the email, password, and name to the signUp function
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
          username: data.get("username"),
      }), 
    });

    console.log("response", response);

    // if the response is successful, redirect to the dashboard
    if (response.ok && !response.error) {
      router.push("/login");
    } else {
      // otherwise, show the error message
      console.log("Error: ", response);
      setError(response.error);
    }  
  };

  // return a form element with name, email, and password fields, and a sign up button
  return (
    <form
      className="w-full mt-8 text-xl text-black font-semibold flex flex-col"
      onSubmit={signup}
    >
      {error && (
        <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
      )}
      <input
        type="text"
        name="username"
        placeholder="Name"
        required
        className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
      >
        Sign up
      </button>
      <p className="text-sm px-8 py-3">Already have an account? <Link 
        href="/"
        className="pt-2 inline-block text-red-500">Sign In</Link></p>
    </form>
  );
}
