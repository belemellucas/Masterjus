import { PrismaClient } from "@prisma/client"
import CardItem from "../../components/CardItem";
import { fetchCategory } from "@/actions/actions"
import Link from "next/link";
import AdminLayout from "../layouttest";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions"

const prisma = new PrismaClient();

const Courses = async ({searchParams}) => {
  const session = await getServerSession(authOptions);
  console.log(session, "SESSION")
    const query = searchParams?.query;
   
    const cards = await prisma.cards.findMany({
        where: query ? {
            OR: [
                { infoCard: { contains: query } },
               
            ],

        } : {}
    })
   
    return (
      <AdminLayout>
       <div className="flex-grow ml-64">
    <div className="flex justify-center items-center mt-5">
      <Link href="/admin/courses/add-course" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
        Adicionar Curso
      </Link>
    </div>
    <h2 className="text-center px-2 text-2xl py-2 font-bold">Cursos</h2>

    {cards?.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
        {cards.map((card) => (
          <CardItem key={card?.id} card={card} />
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">Não há cursos cadastrados.</p>
    )}
  </div>
        </AdminLayout>
    )
}

export default Courses