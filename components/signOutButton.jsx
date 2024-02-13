"use client";

import { signOut } from "next-auth/react"


// create a signout button component
function SignoutButton() {
  // return a button element with signOut as onClick handler
  return (
    <button onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}>
      Sign Out
    </button>
  )
}

// export the signout button component
export default SignoutButton
