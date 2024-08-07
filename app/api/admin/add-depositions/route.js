import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
//import { authOptions } from "../../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/utils/authOptions"



const prisma = new PrismaClient();

export async function POST(req, {params}) {
    try {

        const session = await getServerSession(authOptions);


        const { imageDep, depoimento, autorDepo } = await req.json();

   
    
    if (session?.user?.role === 'ADMIN' || session?.user?.permissions?.includes('CREATE_BLOG')) {
        // push the data into the DB
        const new_cat = await prisma.depoimento.create({
            data: {
                imageDep: imageDep  ? imageDep : null,
                depoimento,
                autorDepo
            }
        })

        revalidatePath('/admin/depositions')
    
        return NextResponse.json({ message: 'Depoimento adicionado com sucesso!' }, { status: 201 });

    } else {

        return NextResponse.json({ message: 'Você não tem permissão para adicionar a categoria!' }, { status: 403 });

    }

    
    
    } catch (error) {
        console.log("Error while Registeing", error);
        return NextResponse.json({ message: 'Error Occured While Registering the user.' }, { status: 500 });
    }
}