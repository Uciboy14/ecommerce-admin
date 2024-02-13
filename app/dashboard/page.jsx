import { getServerSession } from 'next-auth';
import { authConfig } from "@/lib/auth";
import React from 'react'

const page = async () => {
    const session = await getServerSession(authConfig);
    
    console.log("Session: ", session);

    if (!session) return redirect("/login");
  return (
    <div>page</div>
  )
}

export default page