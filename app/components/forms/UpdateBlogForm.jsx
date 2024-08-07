"use client";

import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tagsinput/react-tagsinput.css";
import { usePathname } from "next/navigation";

const AddBlogForm = ({ blog }) => {
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        fetch("/api/admin/all-blogs").catch((error) => {
          console.error('Failed to fetch data:', error); 
        });
     
      setValue("subtitulo", blog.subtitulo);
      setValue("title", blog.title);
      setValue("description", blog.description);
      setValue("category", blog.category);

      if (blog.imageUrl) {
        setSelectedImage(`data:image/jpeg;base64,${blog.imageUrl}`);
        setBase64Files([blog.imageUrl]);
      }
    }   
    catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
    fetchCourseData();
  }, [blog, setValue]);

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

  const onSubmit = async (formData) => {
    try {
      let hasChanges = false;

      // Compare current data with new data
      if (formData.subtitulo !== blog.subtitulo) hasChanges = true;
      if (formData.title !== blog.title) hasChanges = true;
      if (formData.description !== blog.description) hasChanges = true;
      if (formData.category !== blog.category) hasChanges = true;

      if (!hasChanges) {
        toast.error("Por favor, faça pelo menos uma alteração no blog.", {
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
        formData.imageUrl = base64Files[0];
      }
      formData.imageUrl = base64Files[0];
      formData.id = id;
      console.log(formData.imageUrl)
      const res = await fetch("/api/admin/update-blog", {
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
        await fetch("/api/admin/all-blogs");
       router.push(`/admin/blogs?${new Date().getTime()}`);

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

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex-grow md:ml-64 mt-16">
      <div className="flex flex-col justify-center items-center">
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-8 bg-white rounded shadow-md"
        >
          <h2 className="flex justify-center text-2xl text-green-500 font-semibold mb-6">
            Atualizar blog
          </h2>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Carregar imagem
            </label>

            <input
              type="file"
              id="image"
              name="image"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
              //{...register("image", { required: "Uma imagem é obrigatória" })}
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

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              {...register("title", { required: "Título é obrigatório" })}
              className="mt-1 p-2 w-full border text-gray-600 rounded-md"
              placeholder="Entre com o título"
            />
            {errors?.title && <p role="alert">{errors?.title?.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="subtitulo"
              className="block text-sm font-medium text-gray-600"
            >
              Subtítulo
            </label>
            <input
              type="text"
              id="subtitulo"
              name="subtitulo"
              {...register("subtitulo", {
                required: "Subtítulo é obrigatório",
              })}
              className="mt-1 p-2 w-full border text-gray-600 rounded-md"
              placeholder="Entre com o subtítulo"
            />
            {errors?.subtitulo && (
              <p role="alert">{errors?.subtitulo?.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              {...register("description")}
              rows="4"
              className="mt-1 p-2 text-gray-600 w-full border rounded-md"
              placeholder="Entre com a descrição"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Categoria
            </label>
            <input
              type="text"
              id="category"
              name="category"
              {...register("category", { required: "Categoria é obrigatória" })}
              className="mt-1 p-2 text-gray-600 w-full border rounded-md"
              placeholder="Entre com a categoria"
            />
            {errors?.category && (
              <p role="alert">{errors?.category?.message}</p>
            )}
          </div>
          <div className="flex justify-center">
          <Button label={"Atualizar Blog"} color={"green"} />

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogForm;
