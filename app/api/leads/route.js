import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { isComplex } = body;
    if (isComplex == false) {
      const { nome, email } = body;
      const new_lead = await prisma.lead.create({
        data: {
          email,
          nome,
        },
      });
      return NextResponse.json(
        { message: "Email cadastrado" },
        { status: 201 }
      );
    } else if (isComplex == true) {
      const {
        cpf,
        nome,
        email,
        celular,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        categoria,
      } = body;
      const new_lead = await prisma.lead.create({
        data: {
          cpf,
          email,
          nome,
          celular,
          cep,
          endereco,
          numero,
          complemento,
          bairro,
          categoria,
        },
      });
      return NextResponse.json(
        { message: "Email cadastrado" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Error Occured While Fetching blogs." },
      { status: 500 }
    );
  } catch (error) {
    console.log("Error while Fetching", error);
    return NextResponse.json(
      { message: "Error Occured While Fetching blogs." },
      { status: 500 }
    );
  }
}
