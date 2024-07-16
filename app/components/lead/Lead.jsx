"use client";

import { useRef, useState } from "react";
import { toast } from "react-toastify";

const Lead = () => {
  const ref = useRef();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    isComplex: false,
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
    formData.isComplex = false;

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
    <div className="flex justify-center items-center px-8 py-4 w-full text-xs text-white bg-neutral-950 max-md:px-5 max-md:max-w-full">
      <form
        onSubmit={handleSubmit}
        className="flex gap-5 justify-between items-start max-w-full w-[1169px] max-md:flex-wrap"
      >
        <div className="text-lg leading-7">
          Fique por dentro
          <br />
          de tudo que
          <br />
          acontece no
          <br />
          Direito!
        </div>
        <div className="flex flex-col justify-start items-start px-4 py-3 bg-white rounded-3xl border border-white border-solid text-neutral-500 max-md:pr-5 w-96 h-14">
          <input
            type="text"
            name="nome"
            value={formData.nome}
            placeholder="Nome"
            onChange={handleInputChange}
            className="w-full h-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex flex-col justify-start items-start px-4 py-3 bg-white rounded-3xl border border-white border-solid text-neutral-500 max-md:pr-5 w-96 h-14">
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="E-mail"
            onChange={handleInputChange}
            className="w-full h-full bg-transparent focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center px-12 py-4 text-base leading-6 text-center bg-blue-800 rounded-[40px] max-md:px-5"
        >
          ENVIAR
        </button>
      </form>
    </div>
  );
};

export default Lead;
