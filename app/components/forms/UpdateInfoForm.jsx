"use client";

import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const UpdateInfoForm = ({ singleInfoSite }) => {
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
  const [imageFiles, setImageFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);
  const [desktopImageFiles, setDesktopImageFiles] = useState([]);
  const [desktopBase64Files, setDesktopBase64Files] = useState([]);
  const [mobileImageFiles, setMobileImageFiles] = useState([]);
  const [mobileBase64Files, setMobileBase64Files] = useState([]);
  const [selectedImageDesktop, setSelectedImageDesktop] = useState([]);

  const handleImageChange = (e, type) => {
    const files = Array.from(e.target.files);
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
        if (type === "desktop") {
          setDesktopImageFiles([...desktopImageFiles, ...files]);
          setDesktopBase64Files([...desktopBase64Files, ...base64String]);
          setSelectedImageDesktop([
            ...selectedImageDesktop,
            ...files.map((file) => URL.createObjectURL(file)),
          ]);
        } else if (type === "mobile") {
          setMobileImageFiles([...mobileImageFiles, ...files]);
          setMobileBase64Files([...mobileBase64Files, ...base64String]);
        }
      })
      .catch((error) => console.error("Error converting images", error));
  };

  const onSubmit = async (event) => {
    if (desktopBase64Files.length === 0 || mobileBase64Files.length === 0) {
      alert("Por favor, carregue imagens para desktop e mobile.");
      return;
    }
    try {
      event.imageAnex = desktopBase64Files;
      event.imageMob = mobileBase64Files;
      event.id = id;
      const res = await fetch("/api/admin/update-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (res.ok) {
        ref?.current?.reset();
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
        await fetch("/api/admin/all-infoSite");
        router.push(`/admin/infoSite?${new Date().getTime()}`);
      } else {
        const errorData = await res.json();
        console.log("Something went wrong in else block");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const removeDesktopImage = (index) => {
    const newImageFiles = [...desktopImageFiles];
    newImageFiles.splice(index, 1);
    setDesktopImageFiles(newImageFiles);

    const newBase64Files = [...desktopBase64Files];
    newBase64Files.splice(index, 1);
    setDesktopBase64Files(newBase64Files);

    const newSelectedImages = [...selectedImageDesktop];
    newSelectedImages.splice(index, 1);
    setSelectedImageDesktop(newSelectedImages);
  };

  const removeMobileImage = (index) => {
    const newImageFiles = [...mobileImageFiles];
    newImageFiles.splice(index, 1);
    setMobileImageFiles(newImageFiles);

    const newBase64Files = [...mobileBase64Files];
    newBase64Files.splice(index, 1);
    setMobileBase64Files(newBase64Files);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      setValue("linkVideo", singleInfoSite.linkVideo);
      setValue("tituloVideo", singleInfoSite.tituloVideo);
      setValue("descVideo", singleInfoSite.descVideo);

      if (singleInfoSite.imageAnex && singleInfoSite.imageAnex.length > 0) {
        setSelectedImageDesktop(
          singleInfoSite.imageAnex.map((img) => `data:image/jpeg;base64,${img}`)
        );
        setDesktopBase64Files(singleInfoSite.imageAnex);
      }

      if (singleInfoSite.imageMob && singleInfoSite.imageMob.length > 0) {
        setMobileBase64Files(singleInfoSite.imageMob);
      }
    };
    fetchCourseData();
  }, [singleInfoSite, setValue]);

  return (
    <div className="flex-grow md:ml-64 mt-16">
      <div className="flex flex-col justify-center items-center">
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-8 bg-white rounded shadow-md"
        >
          <h2 className="text-2xl text-green-500 font-semibold mb-6">
            Editar imagens e video
          </h2>
          <div className="mb-4 w-full">
            <label
              htmlFor="desktop-file"
              className="block text-sm font-medium text-gray-700 pb-2"
            >
              Carregar Imagens para Desktop
            </label>

            <input
              type="file"
              id="desktop-file"
              name="desktop-file"
              onChange={(e) => handleImageChange(e, "desktop")}
              accept="image/*"
              className="hidden"
            />

            <label
              htmlFor="desktop-file"
              className="cursor-pointer block w-full max-w-xs mx-auto bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold py-2 px-4 rounded-lg text-center shadow-md"
            >
              Selecionar Imagens
            </label>
            <div>
              {selectedImageDesktop &&
                selectedImageDesktop.map((preview, index) => (
                  <div
                    key={index}
                    style={{ display: "inline-block", margin: "10px" }}
                  >
                    <img
                      src={preview}
                      alt=""
                      style={{ width: "100px", height: "auto" }}
                    />
                    <button
                      type="button"
                      onClick={() => removeDesktopImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
            {errors.imageAnex && (
              <p className="text-red-500 text-sm mt-1">
                Este campo é obrigatório
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="mobile-file"
              className="block text-sm font-medium text-gray-700 pb-2"
            >
              Carregar Imagens para dispositivos móveis
            </label>

            <input
              type="file"
              id="mobile-file"
              name="mobile-file"
              onChange={(e) => handleImageChange(e, "mobile")}
              accept="image/*"
              className="hidden"
            />

            <label
              htmlFor="mobile-file"
              className="cursor-pointer block w-full max-w-xs mx-auto bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold py-2 px-4 rounded-lg text-center shadow-md"
            >
              Selecionar Imagens
            </label>
            <div>
              {mobileBase64Files.map((base64, index) => (
                <div
                  key={index}
                  style={{ display: "inline-block", margin: "10px" }}
                >
                  <img
                    src={`data:image/jpeg;base64,${base64}`}
                    alt=""
                    style={{ width: "100px", height: "auto" }}
                  />
                  <button
                    type="button"
                    onClick={() => removeMobileImage(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {errors.imageAnex && (
              <p className="text-red-500 text-sm mt-1">
                Este campo é obrigatório
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="linkVideo"
              className="block text-sm font-medium text-gray-600"
            >
              Link do Vídeo
            </label>
            <input
              id="linkVideo"
              {...register("linkVideo")}
              className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Link do vídeo"
            />
            {errors.linkVideo && (
              <p className="text-red-500 text-sm mt-1">
                Este campo é obrigatório
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="tituloVideo"
              className="block text-sm font-medium text-gray-600"
            >
              Título do Vídeo
            </label>
            <input
              id="tituloVideo"
              {...register("tituloVideo")}
              className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Título do vídeo"
            />
            {errors.tituloVideo && (
              <p className="text-red-500 text-sm mt-1">
                Este campo é obrigatório
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="descVideo"
              className="block text-sm font-medium text-gray-600"
            >
              Descrição do Vídeo
            </label>
            <textarea
              id="descVideo"
              {...register("descVideo")}
              className="block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Descrição do vídeo"
            />
            {errors.descVideo && (
              <p className="text-red-500 text-sm mt-1">
                Este campo é obrigatório
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <Button label={"Atualizar Informações"} color={"green"}>
              Atualizar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInfoForm;
