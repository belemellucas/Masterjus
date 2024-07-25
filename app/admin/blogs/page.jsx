import { PrismaClient } from "@prisma/client";
import BlogItem from "../../components/BlogItem";
import Search from "../../components/Search";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { authOptions } from "@/app/utils/authOptions";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminLayout from "../layout";

const prisma = new PrismaClient();

const Blogs = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const checkPermissions = session?.user?.permissions?.includes("CREATE_BLOG");

  const query = searchParams?.query;

  // home blogs listing page

  const blogs = await prisma.blog.findMany({
    where: query
      ? {
          OR: [
            { title: { contains: query } },
            { category: { contains: query } },
          ],
        }
      : {}, // fetch all the data blogs
  });

  const admin = session?.user?.role === "ADMIN";

  if (!admin && !checkPermissions) {
    console.log("YOU CANNOT CREATE!");
    redirect("/");
  }

  return (
     <AdminLayout>
      <div className="flex-grow ml-64">
    <div className="flex justify-center items-center mt-5">
      <Link href="/admin/blogs/add-blog" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
        Adicionar Blog
      </Link>
    </div>
    <h2 className="text-center px-2 text-2xl py-2 font-bold">Blogs</h2>
    {blogs?.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
        {blogs.map((blog) => (
          <BlogItem key={blog?.id} blog={blog} />
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">Não há blogs cadastrados.</p>
    )}
  </div>

      </AdminLayout>
    

  ); 
};

export default Blogs;



