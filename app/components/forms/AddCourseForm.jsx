"use client";
import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
//import { fetchCategory } from "@/actions/actions"

const AddCourseForm = ({ categoriesData }) => {
  const ref = useRef();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);

  const onSubmit = async (data) => {
    try {
      data.imageCard = base64Files;
      const res = await fetch("/api/admin/add-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        ref?.current?.reset();
       // router.push("/courses");
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
      setImageFiles([]);
      setBase64Files([]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleImageChange = (e) => {
    console.log(e, "entrou no handle")
    const files = Array.from(e.target.files);
    console.log(files)
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve(reader.result.split(",")[1]);
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

  return (
    <div className="flex-grow ml-64">
    <div className="flex flex-col justify-center items-center">
      <h2 className='text-center px-2 text-2xl py-2 font-bold'>Adicionar Curso</h2>
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-2 p-8 bg-white rounded shadow-md flex flex-col items-center"
      >
        <h2 className="text-2xl text-green-500 font-semibold mb-6 flex justify-center">
         Criar novo curso
        </h2>
  
        <div className="mb-4 w-full">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 pb-2">Carregar Imagem</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <label htmlFor="image" className="cursor-pointer block w-full max-w-xs mx-auto bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold py-2 px-4 rounded-lg text-center shadow-md">
            Selecionar Imagem
          </label>
        </div>
  
        <div className="mb-4 w-full">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">Titulo</label>
          <input
            type="text"
            id="infoCard"
            name="infoCard"
            {...register("infoCard", { required: true })}
            className="mt-1 p-2 w-full border text-gray-600 rounded-md"
            placeholder="Insira o título"
          />
          {errors?.title && <p role="alert">{errors?.title?.message}</p>}
        </div>
  
        <div className="mb-4 w-full">
          <label htmlFor="catId" className="block text-sm font-medium text-gray-600">Categoria</label>
          <select
            id="catId"
            name="catId"
            {...register("catId", { required: true })}
            className="mt-1 p-2 text-gray-600 w-full border rounded-md"
          >
            <option value="">Selecione uma categoria</option>
            {categoriesData.map((category) => (
              <option key={category.id} value={category.id}>
                {category.NomeCat}
              </option>
            ))}
          </select>
        </div>
  
        <div className="mb-4 w-full">
          <label htmlFor="valorAtual" className="block text-sm font-medium text-gray-600">Valor Atual</label>
          <input
            id="valorAtual"
            name="valorAtual"
            {...register("valorAtual", { required: true })}
            className="mt-1 p-2 text-gray-600 w-full border rounded-md"
            placeholder="Insira o valor atual"
          />
        </div>
  
        <div className="mb-4 w-full">
          <label htmlFor="valorAnt" className="block text-sm font-medium text-gray-600">Valor Anterior</label>
          <input
            id="valorAnt"
            name="valorAnt"
            {...register("valorAnt", { required: true })}
            className="mt-1 p-2 text-gray-600 w-full border rounded-md"
            placeholder="Insira o valor anterior"
          />
        </div>
  
        <div className="mb-4 w-full">
          <label htmlFor="numParcela" className="block text-sm font-medium text-gray-600">Numero de Parcelas</label>
          <input
            id="numParcela"
            name="numParcela"
            type="number"
            {...register("numParcela", {
              required: true,
              valueAsNumber: true,
              validate: (value) =>
                Number.isInteger(value) || "O valor deve ser um número inteiro",
            })}
            className="mt-1 p-2 text-gray-600 w-full border rounded-md"
            placeholder="Insira o número de parcelas"
          />
        </div>
  
        <div className="mb-4 w-full">
          <label htmlFor="linkCurso" className="block text-sm font-medium text-gray-600">Link do Curso</label>
          <textarea
            id="linkCurso"
            name="linkCurso"
            {...register("linkCurso", { required: true })}
            rows="4"
            className="mt-1 p-2 text-gray-600 w-full border rounded-md"
            placeholder="Insira o link do curso"
          ></textarea>
        </div>
  
        <div className="mb-4 w-full">
          <label htmlFor="subCurso" className="block text-sm font-medium text-gray-600">Subtítulo do Curso</label>
          <textarea
            id="subCurso"
            name="subCurso"
            {...register("subCurso", { required: true })}
            rows="4"
            className="mt-1 p-2 text-gray-600 w-full border rounded-md"
            placeholder="Insira o subtítulo do curso"
          ></textarea>
        </div>
  
        <div className="mb-4 w-full">
          <label htmlFor="DescCurso" className="block text-sm font-medium text-gray-600">Descrição do Curso</label>
          <textarea
            id="DescCurso"
            name="DescCurso"
            {...register("DescCurso", { required: true })}
            rows="4"
            className="mt-1 p-2 text-gray-600 w-full border rounded-md"
            placeholder="Insira a descrição do curso"
          ></textarea>
        </div>
  
        <Button label={"Adicionar Curso"} color={"green"} />
      </form>
    </div>
  </div>

  );
};

export default AddCourseForm;
