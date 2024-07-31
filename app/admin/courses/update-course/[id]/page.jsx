//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { authOptions } from "@/app/utils/authOptions"
import UpdateCourseForm from "@/app/components/forms/UpdateCourseForm"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { fetchCategory } from "@/actions/actions"
import AdminLayout from "../../../../components/admin/adminLayout/AdminLayout"


const UpdateBlog = async () => {
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
        <AdminLayout>
            <UpdateCourseForm categoriesData={categoriesData} />
        </AdminLayout>
    )
}

export default UpdateBlog