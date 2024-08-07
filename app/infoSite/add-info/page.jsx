import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AddInfoSiteForm from "@/app/components/forms/AddInfoSiteForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


const AddInfoSite = async () => {
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
            <h2 className='text-center mt-4 px-2 text-2xl py-2 font-bold'>Adicionar Imagens no Site</h2>
            <AddInfoSiteForm />
        </div>
    )
}

export default AddInfoSite