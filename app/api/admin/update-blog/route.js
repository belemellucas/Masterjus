import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/utils/authOptions";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function POST(req, { params }) {
    try {
        const session = await getServerSession(authOptions);

         const { id, subtitulo, title, description, category, imageUrl } = await req.json();
    
         if (session?.user?.role === 'ADMIN' || session?.user?.permissions?.includes('UPDATE_COURSE')) {
            const normalizedImageCard = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
            
            const updated_blog = await prisma.blog.update({
                where: { id: id },
                data: {
                    imageUrl: normalizedImageCard.length > 0 ? normalizedImageCard : null,
                    subtitulo,
                    title,
                    description, 
                    category,
                    authorId: session?.user?.id
                }
            });

            revalidatePath('/admin/blogs');

            return NextResponse.json({ message: 'Blog atualizado com sucesso!' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Você não tem permissão para atualizar o curso!' }, { status: 403 });
        }
    } catch (error) {
        console.log("Error while updating course", error);
        return NextResponse.json({ message: 'Ocorreu um erro ao atualizar o curso.' }, { status: 500 });
    }
}
