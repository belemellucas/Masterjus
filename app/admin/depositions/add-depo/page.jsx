//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AddDepositionsForm from "@/app/components/forms/AddDepositionsForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/utils/authOptions"


const AddDepositions = async () => {
    const session = await getServerSession(authOptions)

    // as i have the permissions i can see this page / routes

    const checkPermissions = session?.user?.permissions?.includes('CREATE_BLOG');

    const admin = session?.user?.role === 'ADMIN';

    if (!admin && !checkPermissions) {
        console.log('YOU CANNOT CREATE!')
        redirect('/')
    }

    return (
        <div>
            <AddDepositionsForm />
        </div>
    )
}

export default AddDepositions