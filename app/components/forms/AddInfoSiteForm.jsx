"use client";

import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css';

const AddInfoSiteForm = () => {
    const ref = useRef();
    const router = useRouter();
    const {register, handleSubmit, control, formState: {errors}} = useForm();
    const onSubmit = async (data) => {
        const formData = new FormData();

        // Capturar arquivos do input e adicioná-los ao FormData
        const files = data.imageAnex;
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            formData.append('imageAnex', files[i]);
          }
        }
        console.log([...formData.entries()]);
        try {

            const res = await fetch("/api/admin/add-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //body: JSON.stringify(data)
                body: formData
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
                console.log('Something went wrong in else block');
                
            }
        } catch (error) {
           console.log('error', error);
        }
    }

    return (
        <form ref={ref} onSubmit={handleSubmit(onSubmit)}  className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
            <h2 className="text-2xl text-green-500 font-semibold mb-6">Adicionar novas imagens</h2>
            <div className="mb-4">
        <label htmlFor="imageAnex" className="block text-sm font-medium text-gray-600">
          Adicionar Imagens
        </label>
        <input
          id="imageAnex"
          name="imageAnex"
          type="file"
          {...register('imageAnex', { required: true })}
          multiple
          className="mt-1 p-2 text-gray-600 w-full border rounded-md"
        />
        {errors.imageAnex && <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>}
      </div>
      {/* <div className="mb-4">
        <label htmlFor="linkVideo" className="block text-sm font-medium text-gray-600">
          Link do Vídeo
        </label>
        <input
          id="linkVideo"
          name="linkVideo"
          type="text"
          {...register('linkVideo', { required: true })}
          className="mt-1 p-2 text-gray-600 w-full border rounded-md"
          placeholder="Insira o link do vídeo"
        />
        {errors.linkVideo && <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>}
      </div> */}
            <Button label={'Adicionar Categoria'} color={'green'} />
        </form>
    )
}

export default AddInfoSiteForm