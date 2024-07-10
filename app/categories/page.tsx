import { PrismaClient } from "@prisma/client"
import CategoryItem from "../components/CategoryItem";
import Search from "../components/Search";

const prisma = new PrismaClient();

const Categories = async ({searchParams}) => {

    const query = searchParams?.query;
   
    // home blogs listing page

    const categories = await prisma.catCurso.findMany({
        where: query ? {
            OR: [
                { NomeCat: { contains: query } },
                // { category: { contains: query } },
            ],

        } : {} // fetch all the data blogs
    })

  
   
    return (
        <div>

            {/* <Search /> */}
            <h2 className='text-center mt-4 px-2 text-2xl py-2 font-bold'>All Blogs</h2>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
                {categories?.length > 0 && categories.map((cat) => (

                    <CategoryItem key={cat?.id} cat={cat} />

                ))}
            </div>


        </div>
    )
}

export default Categories