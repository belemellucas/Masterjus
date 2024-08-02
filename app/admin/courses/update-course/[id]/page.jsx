//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { authOptions } from "@/app/utils/authOptions";
import UpdateCourseForm from "@/app/components/forms/UpdateCourseForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { fetchCategory, fetchSingleCourse } from "@/actions/actions";
import AdminLayout from "../../../../components/admin/adminLayout/AdminLayout";

const UpdateCourse = async (cardId) => {
  const session = await getServerSession(authOptions);
  const checkPermissions = session?.user?.permissions?.includes("CREATE_BLOG");

  const admin = session?.user?.role === "ADMIN";

  if (!admin && !checkPermissions) {
    console.log("YOU CANNOT CREATE!");
    redirect("/");
  }
  const categoriesData = await fetchCategory();
  const singleCourse = await fetchSingleCourse(cardId.params.id);

  return (
    <AdminLayout>
      <UpdateCourseForm categoriesData={categoriesData} singleCourse={singleCourse}/>
    </AdminLayout>
  );
};

export default UpdateCourse;
