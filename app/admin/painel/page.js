import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/authOptions";
import { redirect } from "next/navigation";
import AdminLayout from "../../components/admin/adminLayout/AdminLayout"
const AdminDashboard = async () => {
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
        <h1>conteudo</h1>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
