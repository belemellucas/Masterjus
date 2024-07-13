import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const UPLOAD_DIR = path.resolve("public/upload");


export async function POST(req, { params }) {
    try {
      const formData = await req.formData();
      const body = Object.fromEntries(formData);
      console.log(body, "BODY")
      let file = null;
      if (body.file instanceof Blob) {
        file = body.file;
      }
  
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        // Escrevendo o arquivo no disco
        await fs.writeFile(path.resolve(UPLOAD_DIR, file.name), buffer);
      }
  
      // Exemplo de como acessar outros campos do formulário
      console.log('Other form fields:', body);
  
      // Retorne uma resposta adequada para o cliente
      return NextResponse.json({ message: 'Form data processed successfully' });
    } catch (error) {
      console.error('Error processing form data:', error);
      return NextResponse.json({ message: 'Error processing form data' }, { status: 500 });
    }
  }
  
    // return NextResponse.json({
    //   success: true,
    //   name: (body.file as File).name,
    // });
//    const file = formData.get('imageAnex')
//     console.log(file)
//     // try {
//     //   const session = await getServerSession(authOptions);
//     //   upload.array('imageAnex')(req, {}, async (err) => {
//     //     if (err) {
//     //         return res.status(500).json({ message: 'Error uploading files'}); 
//     //     }
//     //     const files = req.files;
//     //   })
//     //  // const { linkVideo } = await req.json();
      
//     //  // const files = req.files;
   
    
//     // if (session?.user?.role === 'ADMIN' || session?.user?.permissions?.includes('CREATE_BLOG')) {
//     //     const imagesBase64 = await uploadImages(files)
//     //     // push the data into the DB
//     //     const newInfo = await prisma.infoSite.create({
//     //         data: {
//     //             imageAnex: imagesBase64,
//     //             linkVideo,
//     //             authorId: session?.user?.id,
//     //         }
//     //     })

//     //     revalidatePath('/infoSite')
    
//     //     return NextResponse.json({ message: 'Imagens e Video adicionados com sucesso' }, { status: 201 });

//     // } else {

//     //     return NextResponse.json({ message: 'You Do not have Add InfoSite permissions!' }, { status: 403 });

//     // }

//     // } catch (error) {
//     //     console.log("Error while Registeing", error);
//     //     return NextResponse.json({ message: 'Error Occured While Registering the user.' }, { status: 500 });
//     // }

