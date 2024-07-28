import { fetchSingleBlog }from "@/actions/actions";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from "next/link";
import { Icons } from "react-toastify";

const BlogDetail = async ({ params }) => {
    const id = params?.id;
    
    const blog = await fetchSingleBlog(id);
    const formattedDate = format(blog.createdAt, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
     
    console.log(blog); 
    return (
          <div className="flex justify-center items-center px-16 py-12 bg-white max-md:px-5">
            <div className="flex flex-col max-w-full w-[1070px]">
              <div className="text-4xl font-extrabold leading-10 text-neutral-950 max-md:max-w-full">
                {blog.title}
              </div>
              <div className="flex gap-5 mt-9 text-base text-zinc-800 max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto">{formattedDate}</div>
                {/* <div className="flex-auto">Leitura: 03</div> */}
              </div>
              <div className="mt-5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow max-md:mt-8 max-md:max-w-full">
                      <img
                      src={`data:image/jpeg;base64,${blog.imageUrl}`}
                      alt={`Image ${blog.imageUrl}`}
                      layout="fill"
                      objectFit="cover"
                      className="w-full aspect-square max-md:max-w-full"
                      />
                      <div className="mt-16 text-base text-zinc-800 max-md:mt-10 max-md:max-w-full">
                        {blog.description}
                      </div>
                      <div className="flex items-start self-start mt-5 max-md:flex-wrap">
                        <img
                          loading="lazy"
                          src="/icons/icons-facebook.png"
                          className="shrink-0 aspect-[0.98] w-[52px]"
                        />
                        <img
                          loading="lazy"
                          src="/icons/icons-instagram.png"
                          className="shrink-0 aspect-[0.98] w-[52px]"
                        />
                        <img
                          loading="lazy"
                          src="/icons/icons-whatsapp.gif"
                          className="shrink-0 aspect-[0.98] w-[52px]"
                        />
                        <img
                          loading="lazy"
                          src="/icons/icons-twitterx.png"
                          className="shrink-0 aspect-[0.98] w-[52px]"
                        />
                        <div className="flex flex-col self-stretch">
                          <div className="flex max-md:pr-5">
                            <img
                              loading="lazy"
                              src="/icons/icons-linkedin.png"
                              className="shrink-0 aspect-[0.98] w-[52px]"
                            />
                          </div>
                          <div className="mt-9 text-xl font-medium text-zinc-800">
                            Autor: {blog.AutorBlog}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col max-md:mt-8">
                      <div className="flex">
                        <div className="shrink-0 bg-white rounded border border-gray-300 border-solid h-[38px] w-[228px]" />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4aa88214d88b77a50423205a8b51bdf41129be194890d89759b9637d955b9d9?apiKey=b83b2ddf32004392be05b0f2f766b1e8&&apiKey=b83b2ddf32004392be05b0f2f766b1e8"
                          className="shrink-0 rounded aspect-[1.11] w-[42px]"
                        />
                      </div>
                      <div className="flex mt-5">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb17415f913bad17816fd20493731127dc5f097c215dec343b228ad31d9a50e3?apiKey=b83b2ddf32004392be05b0f2f766b1e8&&apiKey=b83b2ddf32004392be05b0f2f766b1e8"
                          className="shrink-0 aspect-[1.02] w-[54px]"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed10db478e08b7d0b78a9d76553e22d0b1c8c57bc3013df6d14bb4a1e5fcd182?apiKey=b83b2ddf32004392be05b0f2f766b1e8&&apiKey=b83b2ddf32004392be05b0f2f766b1e8"
                          className="shrink-0 aspect-[1.02] w-[54px]"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e2fbd16b94a38743256efdb486f388ba6027efcbffccc58ebed160a28e4dda8?apiKey=b83b2ddf32004392be05b0f2f766b1e8&&apiKey=b83b2ddf32004392be05b0f2f766b1e8"
                          className="shrink-0 aspect-[1.02] w-[54px]"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac6463d1135e9d7462cc1958177d507746503c43b67830a39036a72d2488ea25?apiKey=b83b2ddf32004392be05b0f2f766b1e8&&apiKey=b83b2ddf32004392be05b0f2f766b1e8"
                          className="shrink-0 aspect-[1.02] w-[54px]"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/883c004e557a5cf400f7838ee25424785ce861eca1302dd72c44d36eed184924?apiKey=b83b2ddf32004392be05b0f2f766b1e8&&apiKey=b83b2ddf32004392be05b0f2f766b1e8"
                          className="shrink-0 aspect-[1.02] w-[54px]"
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        // <div><h2 className="text-sm font-bold leading-4">
        //     teste</h2>
        // </div>
        // <div className="flex flex-col text-sm font-medium leading-4 text-right text-neutral-600 max-md:mt-10">
        //     <article className="flex flex-col justify-center pb-7 bg-white rounded border border-solid border-black border-opacity-10 leading-[150%] max-w-[237px] text-zinc-700">
        //     {/* <Link href={`/blog/${id}`}>
        //             {imageUrl ? (
        //         <div className="relative w-full h-[260px] mb-4 rounded-md overflow-hidden">
        //             <Image
        //             src={`data:image/jpeg;base64,${blog.imageUrl}`}
        //             alt={blog.BlogDetail}
        //             layout="fill"
        //             objectFit="cover"
        //             className="w-full h-full"
        //             />
        //         </div> ) : null}
        //     </Link> */}
        //     <div className="flex flex-col px-5 mt-6 w-full">
        //         {/* <h2 className="text-sm font-bold leading-4">
        //             {blog.title.split('. ').map((line, index) => (
        //             <span key={index}>{line}<br /></span>
        //             ))}
        //         </h2> */}
        //         <p className="mt-4 text-xs">{blog.BlogDetail}</p>
        //         <time className="mt-4 text-xs">Publicado em {blog.createdAt}</time>
        //         <a href="#" className="self-end mt-3 text-sm text-right">Leia mais...</a>
        //     </div>
        //     </article>
        // </div>
    );
}

export default BlogDetail