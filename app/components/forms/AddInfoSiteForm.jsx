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

const AddInfoSiteForm = () => {
  const ref = useRef();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [imageFiles, setImageFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);
  const [desktopImageFiles, setDesktopImageFiles] = useState([]);
  const [desktopBase64Files, setDesktopBase64Files] = useState([]);
  const [mobileImageFiles, setMobileImageFiles] = useState([]);
  const [mobileBase64Files, setMobileBase64Files] = useState([]);

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
        } else if (type === "mobile") {
          setMobileImageFiles([...mobileImageFiles, ...files]);
          setMobileBase64Files([...mobileBase64Files, ...base64String]);
        }
      })
      .catch((error) => console.error("Error convertion images", error));
  };

  const onSubmit = async (event) => {
    if (desktopBase64Files.length === 0 || mobileBase64Files.length === 0) {
      alert("Por favor, carregue imagens para desktop e mobile.");
      return;
    }
    try {
      event.imageAnex = desktopBase64Files;
      event.imageMob = mobileBase64Files;
      const res = await fetch("/api/admin/add-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (res.ok) {
        ref?.current?.reset();
        // router.push('/infoSite');
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

  const removeDesktopImage = (index) => {
    const newImageFiles = [...desktopImageFiles];
    newImageFiles.splice(index, 1);
    setDesktopImageFiles(newImageFiles);

    const newBase64Files = [...desktopBase64Files];
    newBase64Files.splice(index, 1);
    setDesktopBase64Files(newBase64Files);
  };

  const removeMobileImage = (index) => {
    const newImageFiles = [...mobileImageFiles];
    newImageFiles.splice(index, 1);
    setMobileImageFiles(newImageFiles);

    const newBase64Files = [...mobileBase64Files];
    newBase64Files.splice(index, 1);
    setMobileBase64Files(newBase64Files);
  };

  return (
    <div className="flex-grow ml-64 mt-16">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center mt-4 px-2 text-2xl py-2 font-bold">
          Imagens e video do Site
        </h2>
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md"
        >
          <h2 className="text-2xl text-green-500 font-semibold mb-6">
            Adicionar novas imagens
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
              //  onChange={handleImageChange}
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
              {desktopImageFiles.map((preview, index) => (
                <div
                  key={index}
                  style={{ display: "inline-block", margin: "10px" }}
                >
                  <img
                    //src={preview}
                    src={URL.createObjectURL(preview)}
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
              {mobileImageFiles.map((preview, index) => (
                <div
                  key={index}
                  style={{ display: "inline-block", margin: "10px" }}
                >
                  <img
                    //src={preview}
                    src={URL.createObjectURL(preview)}
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
              name="linkVideo"
              type="text"
              {...register("linkVideo", { required: true })}
              className="mt-1 p-2 text-gray-600 w-full border rounded-md"
              placeholder="Insira o link do vídeo"
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
              Título área do vídeo
            </label>
            <input
              id="tituloVideo"
              name="tituloVideo"
              type="text"
              {...register("tituloVideo", { required: true })}
              className="mt-1 p-2 text-gray-600 w-full border rounded-md"
              placeholder="Insira título área do vídeo"
            />
            {errors.linkVideo && (
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
              Descrição área do vídeo
            </label>
            <input
              id="descVideo"
              name="descVideo"
              type="text"
              {...register("descVideo", { required: true })}
              className="mt-1 p-2 text-gray-600 w-full border rounded-md"
              placeholder="Insira descrição área do vídeo"
            />
            {errors.linkVideo && (
              <p className="text-red-500 text-sm mt-1">
                Este campo é obrigatório
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <Button label={"Adicionar conteúdos"} color={"green"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInfoSiteForm;
