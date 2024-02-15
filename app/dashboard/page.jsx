import { getServerSession } from 'next-auth';
import { authConfig } from "../../lib/auth";
import Image from 'next/image';
import SignoutButton from '../../components/signOutButton';

const Dashboard = async () => {
    const session = await getServerSession(authConfig);
    
    console.log("Session: ", session.user.token);

    if (!session) return redirect("/login");
  return (
    <div>
        <div className='text-blue-900 flex justify-between'>
            <h2>
                Hello, <b>{session.user.name}</b>
            </h2>
            <div className='flex text-black gap-3'>
                <SignoutButton />
                    <Image
                        src={session.user.image}
                        className='rounded-full'
                        alt=''
                        width={37}
                        height={37}
                    />
            </div>
            
        </div>
    </div>
  )
}

export default Dashboard