import { PrismaClient } from "@prisma/client"
import BlogItem from "../components/BlogItem";
import Search from "../components/Search";
import CardItem from "../components/CourseItem";
import { fetchCategory } from "@/actions/actions"
import InfoSite from "../components/InfoSite";

const prisma = new PrismaClient();

const infoSite = async () => {
   
    const infoSite = await prisma.infoSite.findMany({
        where: query ? {
            OR: [
                { infoCard: { contains: query } },
            ],

        } : {} 
    })
    

    return (
        <div>
            <h2 className='text-center mt-4 px-2 text-2xl py-2 font-bold'>InfoSite</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
                {infoSite?.length > 0 && infoSite.map((info) => (
                    <InfoSite key={info?.id} info={info} />

                ))}
            </div>


        </div>
    )
}

export default infoSite