"use client";

import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css';

const AddCategoryForm = () => {
    const ref = useRef();
    const router = useRouter();
    const {register, handleSubmit, control, formState: {errors}} = useForm();
    const onSubmit = async (data) => {
        try {
            const res = await fetch("/api/admin/add-category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                ref?.current?.reset();
                router.push('/categories');
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
            <h2 className="text-2xl text-green-500 font-semibold mb-6">Adicionar nova categoria</h2>
            <div className="mb-4">
                <label htmlFor="catId" className="block text-sm font-medium text-gray-600">
                    Categoria
                </label>
                <textarea
                    id="NomeCat"
                    name="NomeCat"
                    {...register('NomeCat',{required: true})}
                    rows="4"
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Insira a categoria"
                ></textarea>
            </div>
            <Button label={'Adicionar Categoria'} color={'green'} />
        </form>
    )
}

export default AddCategoryForm