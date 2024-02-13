import { getServerSession } from 'next-auth';
import { authConfig } from "@/lib/auth";

const Dashboard = async () => {
    const session = await getServerSession(authConfig);
    
    console.log("Session: ", session);

    if (!session) return redirect("/login");
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard