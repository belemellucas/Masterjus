import { PrismaClient } from "@prisma/client";
import BlogItem from "../components/BlogItem";
import Search from "../components/Search";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { authOptions } from "@/app/utils/authOptions";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminLayout from "../admin/layout";

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

<<<<<<< HEAD
   
    return (
        <div>
=======
  const admin = session?.user?.role === "ADMIN";
>>>>>>> 47502464cacf9a6b768662385638fa840ec53fbf

  if (!admin && !checkPermissions) {
    console.log("YOU CANNOT CREATE!");
    redirect("/");
  }

  return (
     <AdminLayout>
      <div>      
      <Search />
      <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
        All Blogs
      </h2>
      <Link href="/blogs/add-blog">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Blog
        </button>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
        {blogs?.length > 0 &&
          blogs.map((blog) => <BlogItem key={blog?.id} blog={blog} />)}
      </div>
      </div>
      </AdminLayout>
    

  ); 
};

export default Blogs;
