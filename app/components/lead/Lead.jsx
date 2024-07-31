"use client";

import { useRef, useState } from "react";
import { toast } from "react-toastify";

const Lead = () => {
  const ref = useRef();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      } else {
        // const errorData = await res.json();
        toast.error("Ocorreu um erro. Tente novamente.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log("Something went wrong:", errorData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div class="flex justify-center items-center px-8 py-4 w-full text-xs text-white bg-neutral-950 max-md:px-5 max-md:max-w-full">
    <form class="flex gap-2 justify-between items-start max-w-full w-[1169px] max-md:flex-wrap max-md:justify-center">
      <div class="text-lg leading-7 max-md:text-center">
        Fique por dentro de tudo que acontece no Direito!
      </div>
      <div class="flex flex-col justify-start items-start px-4 py-3 bg-white rounded-3xl border border-white border-solid text-neutral-500 max-md:pr-5 w-80 h-14 max-md:w-64 max-md:h-14">
        <input placeholder="Nome" class="w-full h-full bg-transparent focus:outline-none" type="text" value="" name="nome"/>
      </div>
      <div class="flex flex-col justify-start items-start px-4 py-3 bg-white rounded-3xl border border-white border-solid text-neutral-500 max-md:pr-5 w-80 h-14 max-md:w-64 max-md:h-14">
        <input placeholder="E-mail" class="w-full h-full bg-transparent focus:outline-none" type="email" value="" name="email"/>
      </div>
      <button type="submit" class="flex justify-center text-base leading-6 text-center bg-blue-800 rounded-[40px] py-4 px-16 max-md:px-8 max-md:h-14">
        ENVIAR
      </button>
    </form>
  </div>
  );
};

export default Lead;
