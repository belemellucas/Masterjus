import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminLayout from "../components/admin/adminLayout/AdminLayout"
import { authOptions } from "../utils/authOptions";
import Courses from "./courses/page";
const Admin = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <AdminLayout>
      <div>
        <Courses />
      </div>
    </AdminLayout>
  );
};

export default Admin;
