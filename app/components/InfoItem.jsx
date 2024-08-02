"use client";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const InfoItem = ({ infoSite }) => {
    console.log(infoSite)
  const {
    id,
    linkVideo,
    tituloVideo,
    descVideo,
    imageMob,
    imageAnex
  } = infoSite || {};

  const router = useRouter();

  const deleteCourseHandler = async (id) => {
    try {
      const res = await fetch(`/api/admin/remove-course/${id}`, {
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

  const updateCourseHandler = (id) => {
    router.push(`/admin/courses/update-course/${id}`);
  };

  return (
    <div className="bg-gray-900 p-4 border-2 border-green-200 mx-2 my-2 rounded-lg shadow-md">
      {/* {imageCard ? (
        <Image
          // placeholder="blur"
          loading="lazy"
          width="600"
          height="400"
          quality={100}
          src={`data:image/jpeg;base64,${imageCard}`}
          className="w-full h-[200px]  lg:h-[250px] object-cover mb-4 rounded-md"
        />
      ) : null}

      <h2 className="text-xl text-white font-semibold mb-2">{infoCard}</h2>

     
      <p className="text-gray-300">{DescCurso.slice(0, 100)}...</p>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => deleteCourseHandler(id)}
          className="rounded-lg bg-red-700 text-center px-2 py-1  mt-4"
        >
          delete
        </button>
        <button
          type="button"
          onClick={() => updateCourseHandler(id)}
          className="rounded-lg bg-green-700 text-center px-2 py-1  mt-4"
        >
          update
        </button>
      </div> */}
    </div>
  );
};

export default InfoItem;
