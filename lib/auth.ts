import { NextAuthOptions, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import User from "@models/user";
import { connectToDB } from '@utils/database';

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// using import
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
            if (!credentials || !credentials.email || !credentials.password)
                    return null;

                    // connect to the database
                    await connectToDB();

                    // check if user already exists
                    const userExists = await User.findOne({ email: credentials.email });

                    // verify password
                    if (userExists && bcrypt.compareSync(credentials.password, userExists.password)) {
                      // authentication successful
                      // generate and return a JSON web token
                      const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                      console.log("token: ", token)

                      return {
                          id: userExists._id, // or whatever unique identifier you have for the user
                          email: userExists.email,
                          name: userExists.username, // assuming you have a name field in your user model
                          image: userExists.image,
                          token: token
                      }
                    } else {
                      // authentication failed
                      // return null or throw an error
                      return null;
                    }
                    
                    
        } catch (error) {
            console.log("Error checking if user exists: ", error.message);
            return null
          }
      },
    }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    
  }
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/login");
}

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/login");
  }
}