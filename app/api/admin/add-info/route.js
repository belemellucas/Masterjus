import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();


export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { linkVideo, imageAnex } = await req.json();
 
    if (
      session?.user?.role === "ADMIN" ||
      session?.user?.permissions?.includes("CREATE_BLOG")
    ) {
      const newInfo = await prisma.infoSite.create({
        data: {
          imageAnex: imageAnex,
          linkVideo,
        },
      });

      revalidatePath("/infoSite");

      return NextResponse.json(
        { message: "Imagens e Video adicionados com sucesso" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "You Do not have Add InfoSite permissions!" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.log("Error while Registeing", error);
    return NextResponse.json(
      { message: "Error Occured While Registering the user." },
      { status: 500 }
    );
  }
}
