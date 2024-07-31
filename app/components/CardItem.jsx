"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const CardItem = ({ card, categories }) => {

    const { id, infoCard, catId, imageCard, valorAtual, valorAnt, numParcela, linkCurso, 
        avaliacao, tituloCurso, subCurso, DescCurso, author } = card || {};

    const router = useRouter();
    
    //const category = categories.find((cat) => cat.id === catId); 

    const deleteBlogHandler = async (blogId) => {
        try {
            const res = await fetch(`/api/admin/remove-blog/${blogId}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: 'no-cache',
            });

            if (res.ok) {
                router.refresh();
                const data = await res.json();
                toast.success(`${data.message}`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
            } else {
                const errorData = await res.json();
                console.log('Something went wrong in else block');
                
            }
        } catch (error) {
           console.log('error', error);
        }

    }

    const updateCourseHandler = (id) => {
        router.push(`/admin/courses/update-course/${id}`);
    }

    return (
        <div className="bg-gray-900 p-4 border-2 border-green-200 mx-2 my-2 rounded-lg shadow-md">

            <Link href={`/courses/${id}`}>
                {imageCard ? <Image
                   // placeholder="blur"
                    loading="lazy"
                    width="600"
                    height="400"
                    quality={100} 
                    src={`data:image/jpeg;base64,${imageCard}`}
                    className="w-full h-[200px]  lg:h-[250px] object-cover mb-4 rounded-md" /> : null}
            </Link>

            <Link href={`/courses/${id}`}>
                <h2 className='text-xl text-white font-semibold mb-2'>{infoCard}</h2>
            </Link>
 

            {/* <p className="mb-2 max-w-md text-green-500 inline-block border-2 p-2 border-green-300 rounded-full">
                {category ? category.NomeCat : 'Categoria não encontrada'}
            </p> */}
            <p className="text-gray-300">{DescCurso.slice(0, 100)}...</p>
             <div className="flex justify-center gap-4">
            <button type='button' onClick={() => deleteBlogHandler(id)} className='rounded-lg bg-red-700 text-center px-2 py-1  mt-4'>delete</button>
            <button type='button' onClick={() => updateCourseHandler(id)} className='rounded-lg bg-green-700 text-center px-2 py-1  mt-4'>update</button>
            </div>
        </div>
    )
}

export default CardItem