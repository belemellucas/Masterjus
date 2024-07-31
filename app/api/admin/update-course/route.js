import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/utils/authOptions";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function POST(req, { params }) {
    try {
        const session = await getServerSession(authOptions);

        const { id, infoCard, catId, imageCard, valorAtual, valorAnt, numParcela, linkCurso, subCurso, DescCurso } = await req.json();

        if (session?.user?.role === 'ADMIN' || session?.user?.permissions?.includes('UPDATE_COURSE')) {
            const updated_course = await prisma.cards.update({
                where: { id: id },
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
            });

            revalidatePath('/courses');

            return NextResponse.json({ message: 'Curso atualizado com sucesso!' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Você não tem permissão para atualizar o curso!' }, { status: 403 });
        }
    } catch (error) {
        console.log("Error while updating course", error);
        return NextResponse.json({ message: 'Ocorreu um erro ao atualizar o curso.' }, { status: 500 });
    }
}
