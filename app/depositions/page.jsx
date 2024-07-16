import { PrismaClient } from "@prisma/client"
import DepositionsItem from "../components/DepositionsItem";

const prisma = new PrismaClient();

const Depositions = async () => {
   
    const depositions = await prisma.depoimento.findMany();
    return (
        <div>
            <h2 className='text-center mt-4 px-2 text-2xl py-2 font-bold'>Adicione Depoimentos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
                {depositions?.length > 0 && depositions.map((deposition) => (
                    <DepositionsItem key={deposition?.id} deposition={deposition} />

                ))}
            </div>
        </div>
    )
}

export default Depositions