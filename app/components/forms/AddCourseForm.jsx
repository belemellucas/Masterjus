"use client";
import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css';
//import { fetchCategory } from "@/actions/actions"


const AddCourseForm = () => {
    const ref = useRef();
    // const addBlogHandler = async (formData) => {
    //     // await addBlog(formData);
    //     //refresh the form
    //     ref?.current?.reset();
    //     // show toast 
    //     toast.success('New Blog Added', {
    //         position: "top-right",
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //     });
    // }

    const router = useRouter();
    const {register, handleSubmit, control, formState: {errors}} = useForm();
    const [categories, setCategories] = useState([]);

    const onSubmit = async (data) => {
        try {
            const res = await fetch("/api/admin/add-card", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                ref?.current?.reset();
                router.push('/courses');
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

    useEffect(() => {
      /*  const getCategories = async () => {
            const categoriesData = await fetchCategory();
            setCategories(categoriesData);
        };
        getCategories(); */
    }, []);

    return (
        <form ref={ref} onSubmit={handleSubmit(onSubmit)}  className="max-w-md mx-auto mt-8 p-8 bg-white rounded shadow-md">
            <h2 className="text-2xl text-green-500 font-semibold mb-6">Adicionar novo curso</h2>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                   Carregar link da imagem
                </label>
                <input
                    type="text"
                    id="imageCard"
                    name="imageCard"
                    {...register('imageCard', {required: true})}
                    className="mt-1 p-2 w-full border text-gray-600 rounded-md"
                    placeholder="Adicione imageCard"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                    Titulo
                </label>
                <input
                    type="text"
                    id="infoCard"
                    name="infoCard"
                    {...register('infoCard', {required: true})}
                    className="mt-1 p-2 w-full border text-gray-600 rounded-md"
                    placeholder="Insira o título"
                />
                   {errors?.title && <p role="alert">{errors?.title?.message}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="catId" className="block text-sm font-medium text-gray-600">
                    Categoria
                </label>
                <select
                    id="catId"
                    name="catId"
                    {...register('catId',{required: true})}
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.NomeCat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="valorAtual" className="block text-sm font-medium text-gray-600">
                    Valor Atual
                </label>
                <textarea
                    id="valorAtual"
                    name="valorAtual"
                    {...register('valorAtual',{required: true})}
                    rows="4"
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Insira o valor atual"
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="valorAnt" className="block text-sm font-medium text-gray-600">
                    Valor Anterior
                </label>
                <textarea
                    id="valorAnt"
                    name="valorAnt"
                    {...register('valorAnt', {required: true})}
                    rows="4"
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Insira o valor anterior"
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="numParcela" className="block text-sm font-medium text-gray-600">
                     Numero de Parcelas
                </label>
                <input
                    id="numParcela"
                    name="numParcela"
                    type="number"
                    {...register('numParcela',  
                        { required: true,
                          valueAsNumber: true,
                          validate: (value) => Number.isInteger(value) || "O valor deve ser um número inteiro"   
                        })}
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Insira o número de parcelas"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="linkCurso" className="block text-sm font-medium text-gray-600">
                     Link do Curso
                </label>
                <textarea
                    id="linkCurso"
                    name="linkCurso"
                    {...register('linkCurso',  {required: true})}
                    rows="4"
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Insira o link do curso"
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="subCurso" className="block text-sm font-medium text-gray-600">
                     Subtítulo do Curso
                </label>
                <textarea
                    id="subCurso"
                    name="subCurso"
                    {...register('subCurso',  {required: true})}
                    rows="4"
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Insira o subtítulo do curso"
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="subCurso" className="block text-sm font-medium text-gray-600">
                     Descrição do Curso
                </label>
                <textarea
                    id="DescCurso"
                    name="DescCurso"
                    {...register('DescCurso', {required: true})}
                    rows="4"
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Insira a descrição do curso"
                ></textarea>
            </div>

            {/* <div className="mb-4">
            <label htmlFor="tags" className="block text-sm mt-2 p-1 font-medium text-gray-600 dark:text-gray-400">Job Responsibilities (UI Design, Testing, Coding) *</label>
            <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                <div className="my-3 py-2">
                    <ul className="list-disc list-inside">
                    {field?.value?.map((tag, index) => (
                        <li key={index} className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 mb-1 px-2 py-1 rounded-md">
                        {tag}
                        </li>
                    ))}
                    </ul>
                    <TagsInput
                    type="text"
                    {...field}
                    className="py-2 my-2 w-full border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    />
                </div>
                )}
            />
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                    Category
                </label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    {...register('category', {required: true})}
                    className="mt-1 p-2 text-gray-600 w-full border rounded-md"
                    placeholder="Enter category"
                />
            </div> */}

            <Button label={'Add Blog'} color={'green'} />

        </form>
    )
}

export default AddCourseForm