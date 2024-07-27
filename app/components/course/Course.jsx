"use client"
import CourseItem from "../courseItem/CourseItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import Link from "next/link";
import Image from "next/image";

SwiperCore.use([EffectCoverflow, Pagination]);

const Course = ({ groupedCards, searchParams }) => {
  return (
    <div className="px-4 md:px-16 pb-6 mt-14 mx-auto bg-zinc-100 min-h-screen">
      <div className="flex">
        <div className="flex flex-col justify-start items-center md:items-start w-full max-md:px-5 max-md:mt-10">
          {Object.entries(groupedCards).map(([categoryName, cardsInCategory]) => {
            if (cardsInCategory.length > 0) {
              return (
                <div
                  key={categoryName}
                  className="w-full mb-6 flex flex-col items-center sm:flex-row sm:flex-col sm:items-start"
                >
                  <div className="relative w-full max-w-[278.2px] h-[50px] bg-[#F1F1F1] whitespace-nowrap max-md:whitespace-normal">
                    <div className="absolute w-full max-w-[272.2px] h-[50px] left-0 top-0 bg-[#200140] rounded-[7px] flex items-center justify-center">
                      <span
                        className="w-full max-w-[230.58px] h-[42px] font-poppins font-bold text-[20px] md:text-[24px] leading-[30px] md:leading-[36px] text-center text-white flex items-center"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {categoryName}
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-wrap justify-center gap-10">
                    {cardsInCategory.map((card) => (
                      <CourseItem key={card.id} card={card} />
                    ))}
                  </div>
                  <div className="md:hidden w-full mt-4">
                    <Swiper
                      effect="coverflow"
                      grabCursor
                      centeredSlides
                      slidesPerView="auto"
                      coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                      }}
                      pagination={{ clickable: true }}
                      className="mySwiper"
                    >
                      {cardsInCategory.map((card) => (
                        <SwiperSlide key={card.id} className="w-full max-w-sm">
                          <CourseItem key={card.id} card={card} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Course
