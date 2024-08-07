"use client";

import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tagsinput/react-tagsinput.css";
import { usePathname } from "next/navigation";

const UpdateCategoryForm = ({categoriesData}) => {
    const ref = useRef();
  const pathname = usePathname();
    console.log(categoriesData)
  return (
    <>
     <div>
        <h1>Em construção</h1>
     </div>
    </>
  
   
  );
};

export default UpdateCategoryForm;



  {/** <div className="flex-grow md:ml-64">
      <div className="flex flex-col justify-center items-center mt-14">
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-8 bg-white rounded shadow-md flex flex-col items-center"
        >
          <h2 className="text-2xl text-green-500 font-semibold mb-6 flex justify-center">
            Editar Categoria
          </h2>

          <div className="mb-4 w-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Categoria
            </label>
            <input
              type="text"
              id="category"
              name="category"
              {...register("category", { required: true })}
              className="mt-1 p-2 w-full border text-gray-600 rounded-md"
              placeholder="Insira o título"
            />
            {errors?.title && <p role="alert">{errors?.title?.message}</p>}
          </div>

          <div className="flex justify-center">
            <Button label={"Editar Categoria"} color={"green"} />
          </div>
        </form>
      </div>
    </div> */}