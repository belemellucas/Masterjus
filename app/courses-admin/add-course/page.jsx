//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { authOptions } from "@/app/utils/authOptions"
import AddCourseForm from "@/app/components/forms/AddCourseForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { fetchCategory } from "@/actions/actions"


const AddBlog = async () => {
    const session = await getServerSession(authOptions)

    // as i have the permissions i can see this page / routes

    const checkPermissions = session?.user?.permissions?.includes('CREATE_BLOG');

    const admin = session?.user?.role === 'ADMIN';

    if (!admin && !checkPermissions) {
        console.log('YOU CANNOT CREATE!')
        redirect('/')
    }

    const categoriesData = await fetchCategory();
   
    return (
        <div>
            <h2 className='text-center mt-4 px-2 text-2xl py-2 font-bold'>Adicionar Curso</h2>

            <AddCourseForm categoriesData={categoriesData} />

        </div>
    )
}

export default AddBlog