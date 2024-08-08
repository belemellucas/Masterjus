"use client";

import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import React, { useState } from "react";

const AddDepositionForm = () => {
  const ref = useRef();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve(reader.result.split(",")[1]);
          setSelectedImage(reader.result);
        };

        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((base64String) => {
        setImageFiles([...imageFiles, ...files]);
        setBase64Files([...base64Files, ...base64String]);
      })
      .catch((error) => console.error("Error convertion images", error));
  };

  const onSubmit = async (formData) => {
    try {
      formData.imageDep = base64Files;
      const res = await fetch("/api/admin/add-depositions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        ref?.current?.reset();
        // router.push("/depositions");
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
        await fetch('/api/admin/all-depositions');
        router.push(`/admin/depositions?${new Date().getTime()}`);
      } else {
        const errorData = await res.json();
        console.log("Something went wrong in else block");
      }
      setImageFiles([]);
      setBase64Files([]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex-grow md:ml-64 ">
      <div className="flex flex-col justify-center items-center mt-16">
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-8 bg-white rounded shadow-md"
        >
          <h2 className="text-2xl text-green-500 font-semibold mb-6">
            Adicionar Depoimento
          </h2>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Carregar Imagem
            </label>
            <input
             type="file"
             id="image"
             name="image"
             onChange={handleImageChange}
             accept="image/*"
             className="hidden"
            />
            <label
              htmlFor="image"
              className=" cursor-pointer block w-full max-w-xs mx-auto bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold py-2 px-4 rounded-lg text-center shadow-md"
            >
              Selecionar Imagem
            </label>
            {selectedImage && (
              <div className="mt-4 relative">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-20 h-20 mx-auto rounded-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 text-black rounded-full p-1 -mt-2 -mr-2"
                >
                  &times;
                </button>
              </div>
            )}
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
          <div className="flex justify-center">
            <Button label={"Adicionar Depoimento"} color={"green"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepositionForm;
