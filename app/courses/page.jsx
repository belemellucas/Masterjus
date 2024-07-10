import { PrismaClient } from "@prisma/client"
import BlogItem from "../components/BlogItem";
import Search from "../components/Search";
import CardItem from "../components/CardItem";
import { fetchCategory } from "@/actions/actions"

const prisma = new PrismaClient();

const Cards = async ({searchParams}) => {
    const query = searchParams?.query;
   
    const cards = await prisma.cards.findMany({
        where: query ? {
            OR: [
                { infoCard: { contains: query } },
                // { categoria: { contains: query } },
            ],

        } : {} // fetch all the data blogs
    })
    
    const categoriesData = await fetchCategory();

    return (
        <div>
            {/* <Search /> */}
            <h2 className='text-center mt-4 px-2 text-2xl py-2 font-bold'>Cursos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
                {cards?.length > 0 && cards.map((card) => (
                    <CardItem key={card?.id} card={card} categories={categoriesData} />

                ))}
            </div>


        </div>
    )
}

export default Cards