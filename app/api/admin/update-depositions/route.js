import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/utils/authOptions";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function POST(req, { params }) {
    try {
        const session = await getServerSession(authOptions);

        const { id, depoimento, autorDepo, imageDep } = await req.json();

        if (session?.user?.role === 'ADMIN' || session?.user?.permissions?.includes('UPDATE_COURSE')) {
            const normalizedImageDepo = Array.isArray(imageDep) ? imageDep : [imageDep];
            
            const updated_deposition = await prisma.depoimento.update({
                where: { id: id },
                data: {
                    imageDep: normalizedImageDepo.length > 0 ? normalizedImageDepo : null,
                    autorDepo,
                    depoimento
                  //  authorId: session?.user?.id
                }
            });

            revalidatePath('/admin/depositions');

            return NextResponse.json({ message: 'Depoimento atualizado com sucesso!' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Você não tem permissão para atualizar o depoimento!' }, { status: 403 });
        }
    } catch (error) {
        console.log("Error while updating course", error);
        return NextResponse.json({ message: 'Ocorreu um erro ao atualizar o curso.' }, { status: 500 });
    }
}
