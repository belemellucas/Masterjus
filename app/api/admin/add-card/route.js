import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";


const prisma = new PrismaClient();

export async function POST(req, {params}) {
    try {
        const session = await getServerSession(authOptions);

        const { infoCard, catId, imageCard, valorAtual, valorAnt, numParcela, linkCurso, subCurso, DescCurso } = await req.json();

        if (session?.user?.role === 'ADMIN' || session?.user?.permissions?.includes('CREATE_BLOG')) {
            const new_course = await prisma.cards.create({ 
                data: {
                    imageCard: imageCard ? imageCard : null,
                    infoCard,
                    catId,
                    valorAtual,
                    valorAnt,
                    numParcela,
                    linkCurso,
                    subCurso,
                    DescCurso,
                    authorId: session?.user?.id
                }
            })

            revalidatePath('/courses')

            return NextResponse.json({ message: 'Curso adicionado com sucesso!'}, { status: 201 }); 
        } else {
            return NextResponse.json({ message: 'Você não tem permissão para adicionar o curso!'}, { status: 403 }); 
        }
    } catch (error) {
        console.log("Error while Registeing", error);
        return NextResponse.json({ message: 'Ocorreu um erro ao cadastrar o curso.' }, { status: 500 });
    }
}