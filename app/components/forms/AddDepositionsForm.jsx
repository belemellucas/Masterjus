"use client";

import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import React, { useState } from "react";

const AddDepositionsForm = () => {
  const ref = useRef();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [base64String, setBase64String] = useState("");
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.replace("data:", "").replace(/^.+,/, "");
        setBase64String(base64);
        // setValue('imageUrl', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const data = {
        ...formData,
        imageDep: base64String,
      };
      console.log(data, "data on");
      const res = await fetch("/api/admin/add-depositions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        ref?.current?.reset();
        router.push("/depositions");
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
        console.log("Something went wrong in else block");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md"
      >
        <h2 className="text-2xl text-green-500 font-semibold mb-6">
          Adicionar Novo Depoimento
        </h2>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Imagem Perfil
          </label>
          <input
            type="file"
            id="imageDep"
            name="imageDep"
            {...register("imageDep")}
            className="mt-1 p-2 w-full border text-gray-600 rounded-md"
            onChange={handleImageChange}
            placeholder="Adicione a imagem"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="depoimento"
            className="block text-sm font-medium text-gray-600"
          >
            Depoimento
          </label>
          <input
            type="text"
            id="depoimento"
            name="depoimento"
            {...register("depoimento", { required: true })}
            className="mt-1 p-2 w-full border text-gray-600 rounded-md"
            placeholder="Insira o depoimento"
          />
          {errors?.title && <p role="alert">{errors?.title?.message}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="autorDepo"
            className="block text-sm font-medium text-gray-600"
          >
            Autor
          </label>
          <input
            type="text"
            id="autorDepo"
            name="autorDepo"
            {...register("autorDepo", { required: true })}
            className="mt-1 p-2 w-full border text-gray-600 rounded-md"
            placeholder="Insira o autor"
          />
          {errors?.title && <p role="alert">{errors?.title?.message}</p>}
        </div>
        <Button label={"Adicionar Depoimento"} color={"green"} />
      </form>
    </>
  );
};

export default AddDepositionsForm;
