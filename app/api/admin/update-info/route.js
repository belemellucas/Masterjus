import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/utils/authOptions";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function POST(req, { params }) {
    try {
        const session = await getServerSession(authOptions);

         const { id, imageAnex, imageMob, linkVideo, descVideo,tituloVideo } = await req.json();
    
         if (session?.user?.role === 'ADMIN' || session?.user?.permissions?.includes('UPDATE_COURSE')) {
            const normalizedImageAnex = Array.isArray(imageAnex) ? imageAnex : [imageAnex];
            const normalizedImageMob = Array.isArray(imageMob) ? imageMob : [imageMob];

            const updated_info = await prisma.infoSite.update({
                where: { id: id },
                data: {
                    imageAnex: normalizedImageAnex.length > 0 ? normalizedImageAnex : null,
                    imageMob: normalizedImageMob.length > 0 ? normalizedImageMob : null,
                    linkVideo,
                    tituloVideo, 
                    descVideo
                }
            });

            revalidatePath('/admin/infoSite');

            return NextResponse.json({ message: 'Informações do site atualizado com sucesso!' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Você não tem permissão para atualizar o site!' }, { status: 403 });
        }
    } catch (error) {
        console.log("Error while updating course", error);
        return NextResponse.json({ message: 'Ocorreu um erro ao atualizar o curso.' }, { status: 500 });
    }
}
