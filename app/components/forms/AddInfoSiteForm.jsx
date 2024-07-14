"use client";

import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css';
import React, { useState } from 'react';
import Image from "next/image";

const AddInfoSiteForm = () => {
    const ref = useRef();
    const router = useRouter();
    const {register, handleSubmit, control, formState: {errors}} = useForm();
    const [base64String, setBase64String] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [base64Files, setBase64Files] = useState([]);


     const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
       const promises = files.map((file) => {
     return new Promise((resolve, reject) => {
    const reader = new FileReader();

        reader.onload = (e) => {
           resolve(reader.result.split(',')[1]); 
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

    // const handleImageChange = (e) => {
    //   const files = Array.from(e.target.files);
    //   setImageFiles(files);
    // };

    const onSubmit = async (event) => {
        try {
          event.imageAnex = base64Files; 
            const res = await fetch("/api/admin/add-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //body: JSON.stringify(data)
                body: JSON.stringify(event)
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
        {/* <label htmlFor="image" className="block text-sm font-medium text-gray-600">
          Adicionar Imagens
        </label>
        <input
          type="file"
          id="imageAnex"
          name="imageAnex"
          {...register('imageAnex')}
          //multiple
          className="mt-1 p-2 text-gray-600 w-full border rounded-md"
          onChange={handleImageChange}
        /> */}
         <div>
        <input type="file" onChange={handleImageChange} multiple />
      </div>
      <div>
      {imageFiles.map((preview, index) => (
          <div key={index} style={{ display: "inline-block", margin: "10px" }}>
            <img 
            //src={preview} 
            src={URL.createObjectURL(preview)}
            alt="" style={{ width: "100px", height: "auto" }} />
            <button type="button" onClick={() => removeImage(index)}>Remove</button>
          </div>
        ))} 
      </div>
        {errors.imageAnex && <p className="text-red-500 text-sm mt-1">Este campo é obrigatório</p>}
      </div>
     <div className="mb-4">
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
      </div> 
            <Button label={'Adicionar Categoria'} color={'green'} />
        </form>
    )
}

export default AddInfoSiteForm