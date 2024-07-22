import React from "react";
import BlogPost from './BlogPost';

function Blogs({ searchParams, blogs }) {
    console.log(blogs)
    return (
      <>
        <main className="bg-white">
            <h1 className="text-4xl font-extrabold text-center text-neutral-950">Nosso Blog</h1>
        </main>
        <section className="flex justify-center items-center px-16 pt-10 pb-6 bg-white max-md:px-5">
            <div className="flex flex-col max-w-full w-[1150px]">
                <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    {blogs.slice(0, 3).map((post, index) => (
                    <div key={index} className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                        <div className={`flex flex-col grow ${index !== 1 ? 'mt-20' : ''} max-md:mt-10`}>
                         <BlogPost key={post.id} blogs={post} /> 
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </section>
      </>
    );
  }
  
  export default Blogs;
  