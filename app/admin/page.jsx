//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/app/utils/authOptions"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { fetchUsers } from "@/actions/actions"



const Admin = async () => {
    const session = await getServerSession(authOptions);
   if (!session) {
    redirect('/auth/login');
   }

   if(session?.user?.role !== "ADMIN") {
    redirect('/'); 
   }
   

   const users = await fetchUsers(); 
    return (
        <div>
         <CardCourses searchParams={searchParams} />

        </div>
    )
}

export default Admin
