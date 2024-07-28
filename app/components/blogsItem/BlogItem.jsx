import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogPost = ({ blogs }) => {

  const { id, imageUrl, title, description, createdAt } = blogs;

  // Formatar a data para o formato desejado
  const formattedDate = new Date(createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });


   return (
    <div className="flex flex-col text-sm font-medium leading-4 text-right text-neutral-600 max-md:mt-10">
    <article className="flex flex-col justify-center pb-7 bg-white rounded border border-solid border-black border-opacity-10 leading-[150%] max-w-[237px] text-zinc-700">
    <Link href={`/blog/${id}`}>
    {imageUrl ? (
    <div className="relative w-full h-[260px] mb-4 rounded-md overflow-hidden">
      <Image
              src={`data:image/jpeg;base64,${imageUrl}`}
              alt={`Image ${imageUrl}`}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
     </div> ) : null}
     </Link>
      <div className="flex flex-col px-5 mt-6 w-full">
        <h2 className="text-sm font-bold leading-4">
          {title.split('. ').map((line, index) => (
            <span key={index}>{line}<br /></span>
          ))}
        </h2>
        <p className="mt-4 text-xs">{description}</p>
        <time className="mt-4 text-xs">Publicado em {formattedDate}</time>
        <a href="#" className="self-end mt-3 text-sm text-right">Leia mais...</a>
      </div>
    </article>
  </div>
   )
}
  
    
export default BlogPost;