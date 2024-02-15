import { User, AdapterUser, Session } from "next-auth";
declare module "next-auth" {
  interface User {
    role: string; // add the role property to the user object
  }

  interface AdapterUser extends User {
    role: string; // add the role property to the adapter user object
  }

  interface Session {
    role: string; // add the role property to the session object
  }
}
