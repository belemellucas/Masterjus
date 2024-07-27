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
  console.log(session, "SESSION")
    const categoriesData = await fetchCategory();
   
    return (
        <div>
            <AddCourseForm categoriesData={categoriesData} />
        </div>
    )
}

export default AddBlog