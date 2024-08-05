"use client";
import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { usePathname } from "next/navigation";

const UpdateCourseForm = ({ categoriesData, singleCourse }) => {
  const ref = useRef();
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      setValue("infoCard", singleCourse.infoCard);
      setValue("catId", singleCourse.catId);
      setValue("valorAtual", singleCourse.valorAtual);
      setValue("valorAnt", singleCourse.valorAnt);
      setValue("numParcela", singleCourse.numParcela);
      setValue("linkCurso", singleCourse.linkCurso);
      setValue("subCurso", singleCourse.subCurso);
      setValue("DescCurso", singleCourse.DescCurso);

      if (singleCourse.imageCard) {
        setSelectedImage(`data:image/jpeg;base64,${singleCourse.imageCard}`);
        setBase64Files([singleCourse.imageCard]);
      }
      setSelectedCategory(singleCourse.catId);
    };
    fetchCourseData();
  }, [singleCourse, setValue]);

  const onSubmit = async (data) => {
    try {
      let hasChanges = false;

      // Compare current data with new data
      if (data.infoCard !== singleCourse.infoCard) hasChanges = true;
      if (data.catId !== singleCourse.catId) hasChanges = true;
      if (data.valorAtual !== singleCourse.valorAtual) hasChanges = true;
      if (data.valorAnt !== singleCourse.valorAnt) hasChanges = true;
      if (data.numParcela !== singleCourse.numParcela) hasChanges = true;
      if (data.linkCurso !== singleCourse.linkCurso) hasChanges = true;
      if (data.subCurso !== singleCourse.subCurso) hasChanges = true;
      if (data.DescCurso !== singleCourse.DescCurso) hasChanges = true;

      if (!hasChanges) {
        toast.error("Por favor, faça pelo menos uma alteração no curso.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      if (base64Files && base64Files.length > 0) {
        data.imageCard = base64Files[0];
      }
      data.imageCard = base64Files[0];
      data.id = id;

      const res = await fetch("/api/admin/update-course", {
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
        await fetch("/api/admin/all-courses");
        router.push("/admin/courses");
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
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
          
        };

        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((base64StringArray) => {
        setImageFiles(files);
        setBase64Files(base64StringArray);
        setSelectedImage(URL.createObjectURL(files[0])); // Atualiza a imagem selecionada para exibição
      })
      .catch((error) => console.error("Error converting images", error));
  };

  const isFreeMaterialsCategory = (category) => {
    const normalizedCategory = category.replace(/\s+/g, "").toLowerCase();
    return normalizedCategory === "materiaisgratuitos";
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const category = categoriesData.find(
      (cat) => cat.id === selectedCategoryId
    );
    const categoryName = category ? category.NomeCat : "";
    setSelectedCategory(categoryName);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex-grow md:ml-64">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center px-2 text-2xl py-2 font-bold">
          Adicionar Curso
        </h2>
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto mt-2 p-8 bg-white rounded shadow-md flex flex-col items-center"
        >
          <h2 className="text-2xl text-green-500 font-semibold mb-6 flex justify-center">
            Editar curso
          </h2>

          <div className="mb-4 w-full">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 pb-2"
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
              className="cursor-pointer block w-full max-w-xs mx-auto bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold py-2 px-4 rounded-lg text-center shadow-md"
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

          <div className="mb-4 w-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Titulo
            </label>
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
            <label
              htmlFor="catId"
              className="block text-sm font-medium text-gray-600"
            >
              Categoria
            </label>
            <select
              id="catId"
              name="catId"
              {...register("catId", { required: true })}
              className="mt-1 p-2 text-gray-600 w-full border rounded-md"
              onChange={handleCategoryChange}
            >
              <option value="">Selecione uma categoria</option>
              {categoriesData.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.NomeCat}
                </option>
              ))}
            </select>
          </div>
          {!isFreeMaterialsCategory(selectedCategory) && (
            <>
              <div className="mb-4 w-full">
                <label
                  htmlFor="valorAtual"
                  className="block text-sm font-medium text-gray-600"
                >
                  Valor Atual
                </label>
                <input
                  id="valorAtual"
                  name="valorAtual"
                  {...register("valorAtual", { required: true })}
                  className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                  placeholder="Insira o valor atual"
                />
              </div>

              <div className="mb-4 w-full">
                <label
                  htmlFor="valorAnt"
                  className="block text-sm font-medium text-gray-600"
                >
                  Valor Anterior
                </label>
                <input
                  id="valorAnt"
                  name="valorAnt"
                  {...register("valorAnt", { required: true })}
                  className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                  placeholder="Insira o valor anterior"
                />
              </div>

              <div className="mb-4 w-full">
                <label
                  htmlFor="numParcela"
                  className="block text-sm font-medium text-gray-600"
                >
                  Numero de Parcelas
                </label>
                <input
                  id="numParcela"
                  name="numParcela"
                  type="number"
                  {...register("numParcela", {
                    required: true,
                    valueAsNumber: true,
                    validate: (value) =>
                      Number.isInteger(value) ||
                      "O valor deve ser um número inteiro",
                  })}
                  className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                  placeholder="Insira o número de parcelas"
                />
              </div>
            </>
          )}

          <div className="mb-4 w-full">
            <label
              htmlFor="linkCurso"
              className="block text-sm font-medium text-gray-600"
            >
              Link do Curso
            </label>
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
            <label
              htmlFor="subCurso"
              className="block text-sm font-medium text-gray-600"
            >
              Subtítulo do Curso
            </label>
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
            <label
              htmlFor="DescCurso"
              className="block text-sm font-medium text-gray-600"
            >
              Descrição do Curso
            </label>
            <textarea
              id="DescCurso"
              name="DescCurso"
              {...register("DescCurso", { required: true })}
              rows="4"
              className="mt-1 p-2 text-gray-600 w-full border rounded-md"
              placeholder="Insira a descrição do curso"
            ></textarea>
          </div>
          <div className="flex justify-center">
          <Button label={"Editar Curso"} color={"green"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourseForm;
