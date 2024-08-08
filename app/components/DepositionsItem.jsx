"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const DepositionsItem = ({ depositions }) => {
  const { id, imageDep, autorDepo, depoimento } = depositions || {};
  const router = useRouter();

  const deleteDepositionHandler = async (id) => {
    try {
      const res = await fetch(`/api/admin/remove-deposition/${id}`, {
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
  const updateDepositionHandler = (id) => {
    router.push(`/admin/depositions/update-depo/${id}`);
  };
  return (
    <div className="bg-gray-900 p-4 border-2 border-green-200 mx-2 my-2 rounded-lg shadow-md h-[350px] flex flex-col justify-between">
  <div className="flex items-center mb-4 flex-col">
    {imageDep ? (
      <Image
        loading="lazy"
        width="600"
        height="400"
        quality={100}
        src={`data:image/jpeg;base64,${imageDep}`}
        className="w-24 h-24 rounded-full object-cover mr-4"
      />
    ) : null}

    <div className="text-white text-center mt-4">
      <h2 className="text-xl font-semibold">{autorDepo}</h2>
    </div>
  </div>

  <div className="flex-1 max-h-[180px]">
    <p className="text-white mb-4 break-words overflow-hidden">{depoimento}</p>
  </div>

  <div className="flex justify-center gap-4">
    <button
      type="button"
      onClick={() => deleteDepositionHandler(id)}
      className="rounded-lg bg-red-700 text-center px-2 py-1 mt-4"
    >
      delete
    </button>
    <button
      type="button"
      onClick={() => updateDepositionHandler(id)}
      className="rounded-lg bg-green-700 text-center px-2 py-1 mt-4"
    >
      update
    </button>
  </div>
</div>

  
  
  );
};

export default DepositionsItem;
