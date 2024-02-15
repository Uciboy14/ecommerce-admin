import { NextAuthOptions, getServerSession } from "next-auth";

import User from "../models/user";
import { connectToDB } from '../utils/database';

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
                          role: userExists.role,
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
    async session({ session, user, token }) {
      // Add the user role to the session object
      console.log("user role: ", user, "Token: ", token)
      if (token?.role) {
        // Use a type assertion
        console.log("token role: ", token.role)
        session.role = token.role as string;

        // Or use a type guard
        if (typeof token.role === 'string') {
          session.role = token.role;
        }
      }
      console.log("session: ", session)
      return session; // Return the session object
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Add the user role to the token object
      if (user?.role) {
        token.role = user.role;
      }
      return token; // Return the token object
    },
  },
  
};

export async function isAdminRequest(req,res) {
  const session = await getServerSession(req,res,authConfig);
  if (session?.role !== "admin") {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}

