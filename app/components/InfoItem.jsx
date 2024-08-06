"use client";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const InfoItem = ({ infoSite }) => {
  const {
    id,
    linkVideo,
    tituloVideo,
    descVideo,
    imageMob,
    imageAnex
  } = infoSite || {};

  const router = useRouter();

  const deleteInfoHandler = async (id) => {
    try {
      const res = await fetch(`/api/admin/remove-info/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });

      if (res.ok) {
        router.refresh();
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

  const updateInfoHandler = (id) => {
    router.push(`/admin/infoSite/update-info/${id}`);
  };

  return (
    <div className="bg-gray-900 p-4 border-2 border-green-200 mx-2 my-2 rounded-lg shadow-md">
     {imageAnex ? (
        <Image
          // placeholder="blur"
          loading="lazy"
          width="600"
          height="400"
          quality={100}
          src={`data:image/jpeg;base64,${imageAnex[0]}`}
          className="w-full h-[80px]  lg:h-[120px] object-cover mb-4 rounded-md"
        />
      ) : null} 
       {imageMob ? (
        <Image
          // placeholder="blur"
          loading="lazy"
          width="600"
          height="400"
          quality={100}
          src={`data:image/jpeg;base64,${imageMob[0]}`}
          className="w-full h-[120px]  lg:h-[200px] object-cover mb-4 rounded-md"
        />
      ) : null} 

<h2 className="text-xl text-white font-semibold mb-2">{tituloVideo}</h2>

{/* <p className="mb-2 max-w-md text-green-500 inline-block border-2 p-2 border-green-300 rounded-full">
          {category ? category.NomeCat : 'Categoria não encontrada'}
      </p> */}
<p className="text-gray-300">{linkVideo ? linkVideo.slice(0, 100) : 'Link não disponível'}...</p>
<p className="text-gray-300">{descVideo ? descVideo.slice(0, 100) : 'Descrição não disponível'}...</p>
<div className="flex justify-center gap-4">
  <button
    type="button"
    onClick={() => deleteInfoHandler(id)}
    className="rounded-lg bg-red-700 text-center px-2 py-1  mt-4"
  >
    delete
  </button>
  <button
    type="button"
    onClick={() => updateInfoHandler(id)}
    className="rounded-lg bg-green-700 text-center px-2 py-1  mt-4"
  >
    update
  </button>
</div>
  
    </div>
  );
};

export default InfoItem;
