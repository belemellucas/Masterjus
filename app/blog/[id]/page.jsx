import { fetchSingleBlog }from "@/actions/actions";


const BlogDetail = async ({ params }) => {
 
    const id = params?.id;
   const course = await fetchSingleBlog(id);
        console.log(course)
    return (
        <div></div>
    );
}

export default BlogDetail