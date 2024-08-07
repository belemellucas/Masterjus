"use client";

import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tagsinput/react-tagsinput.css";
import { usePathname } from "next/navigation";

const UpdateCategoryForm = ({ categoriesData }) => {
  const ref = useRef();
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      formData.id = id;
      const res = await fetch("/api/admin/update-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
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
        ref?.current?.reset();
        await fetch("/api/admin/all-category");
        router.push(`/admin/categories?${new Date().getTime()}`);
      } else {
        const errorData = await res.json();
        console.log("API error response:", errorData); // Debug log
        toast.error(errorData.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("API request error:", error); // Debug log
      toast.error("An unexpected error occurred.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        fetch("/api/admin/all-category").catch((error) => {
          console.error("Failed to fetch data:", error);
        });

        setValue("NomeCat", categoriesData.NomeCat);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchCourseData();
  }, [categoriesData, setValue]);

  return (
    <div className="flex-grow md:ml-64 mt-16">
      <div className="flex flex-col justify-center items-center">
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-8 bg-white rounded shadow-md"
        >
          <h2 className="text-2xl text-green-500 font-semibold mb-6">
            Atualizar Categoria
          </h2>

          <div className="mb-4">
            <label
              htmlFor="catId"
              className="block text-sm font-medium text-gray-600"
            >
              Categoria
            </label>
            <input
              id="NomeCat"
              name="NomeCat"
              {...register("NomeCat", { required: true })}
              rows="4"
              className="mt-1 p-2 text-gray-600 w-full border rounded-md"
              placeholder="Insira a categoria"
            ></input>
          </div>
          <div className="flex justify-center">
            <Button label={"Atualizar Categoria"} color={"green"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryForm;

{
  /** <div className="flex-grow md:ml-64">
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
    </div> */
}
