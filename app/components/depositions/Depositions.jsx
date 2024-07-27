"use client";
import { useState, useEffect } from "react";

const Depositions = ({ depositions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? depositions.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === depositions.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % depositions.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [depositions.length]);

  return (
    <div className="relative flex justify-center pt-10 pb-10">
      <div className="flex gap-2.5 items-center px-5 max-md:flex-wrap hover">
        <img
          loading="lazy"
          src="/icones/setaesquerda.svg"
          className="shrink-0 self-stretch my-auto w-12 aspect-square cursor-pointer"
          onClick={handlePrev}
        />
        {depositions[currentIndex] && (
          <img
            loading="lazy"
            src={`data:image/jpeg;base64,${depositions[currentIndex].imageDep}`}
            className="shrink-0 self-stretch my-auto max-w-full aspect-[0.74] w-[210px] h-[280px] rounded-full object-cover"
          />
        )}
        <div className="flex flex-col self-stretch max-md:max-w-full h-[calc(100%-6rem)] max-h-[calc(100%-6rem)]">
          <div className="self-start ml-3 text-4xl font-extrabold leading-10 text-center text-black max-md:max-w-full">
            DEPOIMENTOS DOS ALUNOS
          </div>
          <div className="flex gap-5 mt-20 text-xl leading-8 text-stone-400 max-md:flex-wrap items-start max-md:mt-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8eccec54b85373e583f5a92397a197b91fa21b9e4d073fb484382b1ccfba97dc?"
              className="shrink-0 aspect-[0.98] w-[60px]"
              onClick={handleNext}
            />
                    <div className="flex-auto max-w-[calc(100%-80px)]  overflow-auto">

              {depositions[currentIndex]?.depoimento}
            </div>
          </div>
          <div className="mt-3.5 text-base italic leading-6 text-gray-500 max-md:max-w-full">
            —{" "}
            <span className="italic">
              {depositions[currentIndex]?.autorDepo}
            </span>
          </div>
        </div>
        <img
          loading="lazy"
          src="/icones/setadireita.svg"
          className="shrink-0 self-stretch my-auto w-12 aspect-square cursor-pointer"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default Depositions;
