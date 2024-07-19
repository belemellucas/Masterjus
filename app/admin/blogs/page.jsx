import { getServerSession } from "next-auth";
import Blogs from "../../blogs/page";
import { authOptions } from "@/app/utils/authOptions";


const AdminDashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="mt-5 justify-center items-start flex">
      <Blogs />
    </div>
  );
};

export default AdminDashboard;
