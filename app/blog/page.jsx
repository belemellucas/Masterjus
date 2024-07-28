import { PrismaClient } from "@prisma/client";
import { fetchBlogs } from "@/actions/actions";
import Blogs from "../components/blogs/Blogs"

const prisma = new PrismaClient();

const BlogsPage = async ({ searchParams }) => {
  const query = searchParams?.query;


 const blogs = await prisma.blog.findMany({
    where: query
      ? {
          OR: [
            { blog: { contains: query } }
          ],
        }
      : {}, 
  });
  
  return (
    
    <Blogs blogs={blogs} />
  );
};

export default BlogsPage;
