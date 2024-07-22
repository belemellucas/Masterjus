"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";

// Install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

const CategoryItems = ({ category, groupedCards }) => {
  const normalizedCategory = decodeURIComponent(category).trim().toLowerCase();
  const cardsInCategory = groupedCards[normalizedCategory] || [];

  return (
    <div className="flex flex-col items-center px-5 mx-auto w-full text-center leading-[150%] text-neutral-950 pt-8 pb-10">
      <div className="self-stretch w-full text-4xl font-extrabold leading-10">
        {category.toUpperCase()}
      </div>
      {cardsInCategory.length > 0 ? (
        <>
          {/* Desktop view */}
          <div className="hidden md:flex flex-wrap gap-4 justify-center">
            {cardsInCategory.map((card) => (
              <div key={card.id} className="w-full max-w-sm">
                <div className="relative w-full h-96">
                  <Image
                    src={`data:image/jpeg;base64,${card.imageCard}`}
                    alt={`Image ${card.imageCard}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <div className="mt-2.5 text-2xl font-medium leading-7 h-14 overflow-hidden">
                {card.infoCard}
                </div>
                <div className="mt-11 text-sm font-medium leading-5 text-neutral-400">
                  De <span className="line-through">R$ {card.valorAnt}</span> por
                  R$ {card.valorAtual}
                </div>
                <div className="flex gap-1.5 mt-4">
                  <div className="my-auto text-2xl font-medium">12 x </div>
                  <div className="flex-auto text-3xl font-semibold">
                    R$ {(card.valorAtual / card.numParcela).toFixed(2)}
                  </div>
                </div>
                <div className="mt-4 text-xs font-semibold text-neutral-400">
                  sem juros
                </div>
                <div className="mt-6 text-xs font-semibold">SAIBA MAIS</div>
                <Link href={card.linkCurso} passHref>
                  <div className="justify-center px-6 py-3 mt-6 text-base font-semibold text-white bg-blue-800 rounded-[30px] cursor-pointer">
                    MATRICULE-SE
                  </div>
                </Link>
              
              </div>
            ))}
          </div>

          {/* Mobile view */}
          <div className="md:hidden w-full">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                "rotate": 50,
                "stretch": 0,
                "depth": 100,
                "modifier": 1,
                "slideShadows": true
              }}
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              {cardsInCategory.map((card) => (
                <SwiperSlide key={card.id} className="w-full max-w-sm">
                  <div className="relative w-full h-96">
                    <Image
                      src={`data:image/jpeg;base64,${card.imageCard}`}
                      alt={`Image ${card.imageCard}`}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="mt-2.5 text-2xl font-medium leading-7">
                    {card.infoCard}
                  </div>
                  <div className="mt-11 text-sm font-medium leading-5 text-neutral-400">
                    De <span className="line-through">R$ {card.valorAnt}</span> por
                    R$ {card.valorAtual}
                  </div>
                  <div className="flex gap-1.5 mt-4">
                    <div className="my-auto text-2xl font-medium">12 x </div>
                    <div className="flex-auto text-3xl font-semibold">
                      R$ {(card.valorAtual / card.numParcela).toFixed(2)}
                    </div>
                  </div>
                  <div className="mt-4 text-xs font-semibold text-neutral-400">
                    sem juros
                  </div>
                  <div className="mt-6 text-xs font-semibold">SAIBA MAIS</div>
                  <Link href={card.linkCurso} passHref>
                    <div className="justify-center px-6 py-3 mt-6 text-base font-semibold text-white bg-blue-800 rounded-[30px] cursor-pointer">
                      MATRICULE-SE
                    </div>
                  </Link>
                  <div className="justify-center px-6 py-3 mt-6 text-base font-bold rounded-3xl border-2 border-solid border-neutral-950">
                    MAIS CURSOS
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <p className="ml-12 mt-4">Nenhum item nesta categoria.</p>
      )}
        <div className="justify-center px-6 py-3 mt-6 text-base font-bold rounded-3xl border-2 border-solid border-neutral-950">
                  MAIS CURSOS
        </div>
    </div>
  );
};

export default CategoryItems;
