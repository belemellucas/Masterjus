"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const CourseItem = ({ card }) => {
  const {
    id,
    infoCard,
    catId,
    imageCard,
    valorAtual,
    valorAnt,
    numParcela,
    linkCurso,
    avaliacao,
    tituloCurso,
    subCurso,
    DescCurso,
    author,
  } = card || {};

  const router = useRouter();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };
  const valorAtualFormatted = formatCurrency(parseFloat(valorAtual));
  const valorAntFormatted = formatCurrency(parseFloat(valorAnt));
  const valorParcela = formatCurrency(parseFloat(valorAtual) / numParcela);

  return (
    <>
      <div className="flex flex-col md:max-w-[307px] max-w-full">
        <div className="flex flex-col justify-center text-2xl font-bold leading-8 text-center text-white whitespace-nowrap bg-zinc-100 relative"></div>
        <div className="flex flex-col px-6 py-7 mt-10 w-full bg-white rounded-2xl border border-solid border-zinc-100 max-md:px-5">
          <Link href={`/courses/${id}`}>
            {imageCard ? (
              <div className="relative w-full h-[260px] mb-4 rounded-md overflow-hidden">
                <Image
                  src={`data:image/jpeg;base64,${imageCard}`}
                  alt={`Image ${imageCard}`}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
            ) : null}
          </Link>
          <div className="flex gap-5 justify-between px-px mt-5 text-sm">
            <div className="flex flex-col my-auto leading-5 text-indigo-950">
              <div>
                De{" "}
                <span className="font-semibold line-through">
                  {valorAntFormatted}
                </span>
              </div>
              <div className="mt-3">
                por{" "}
                <span className="font-semibold">R$ {valorAtualFormatted}</span>
              </div>
            </div>
            <div className="flex flex-col text-right text-rose-500 leading-[135%]">
              <div className="text-indigo-950">{numParcela} x de</div>
              <div className="mt-2 text-base font-bold">{valorParcela}</div>
              <div className="mt-2">sem juros</div>
            </div>
          </div>
          <div className="flex gap-5 justify-between px-0.5 mt-7 w-full">
            <div className="flex gap-1.5 self-start text-sm font-semibold leading-7 text-center text-rose-500 whitespace-nowrap">
              <div className="grow">MATRICULE-SE</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b28e715548503f7742454874e29f3c52e850699d1d1cf4eb7cf44cb82bff8b3b?"
                className="shrink-0 self-start w-1.5 aspect-[0.6]"
              />
            </div>
            <div className="flex gap-0">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/762c62323dcb14e78992f90024b9738e0f1da0799023b03410e90301c9a34dd0?"
                className="shrink-0 w-3.5 aspect-[1.08]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ebaaebb54b1056061a97dd735cee7dc37ac9b627d3e06e71cca04d6b1b2adacb?"
                className="shrink-0 aspect-square w-[13px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/94d8988a55db159696fc299a9d84ae3b4d57d357122a7372338123b322e07db9?"
                className="shrink-0 w-3.5 aspect-[1.08]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6462c7e3479c4d57e52094108ce6405dc4eb31e53ef82f04e69a2f21f35b9b2d?"
                className="shrink-0 aspect-square w-[13px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/365e4c6c16ce974cd06cbafe24150ffc4c0625a47e788fca08591151681423c3?"
                className="shrink-0 w-3.5 aspect-[1.08]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseItem;
