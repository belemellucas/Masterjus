"use client";
import { useState, useEffect } from "react";

const Depositions = ({ depositions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxChars = 200;
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const itemsPerSlide = window.innerWidth < 768 ? 3 : 3;
      return prevIndex === 0
        ? Math.max(depositions.length - itemsPerSlide, 0)
        : prevIndex - itemsPerSlide;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const itemsPerSlide = window.innerWidth < 768 ? 3 : 3;
      return prevIndex + itemsPerSlide >= depositions.length
        ? 0
        : prevIndex + itemsPerSlide;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-[32px] md:text-[40px] leading-[48px] font-bold text-black font-poppins text-center pt-6 pb-6">
        DEPOIMENTOS DOS ALUNOS
      </h2>
      <div className="relative flex items-center justify-center pb-10 lg:w-[960px]">
        <div className="pl-8">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center md:left-4 md:transform-none max-md:left-[16px] max-md:-translate-y-1/2">
            <img
              loading="lazy"
              src="/icones/setaesquerda.svg"
              className="shrink-0 w-8 md:w-12 aspect-square cursor-pointer"
              onClick={handlePrev}
            />
          </div>
        </div>

        {/* Deposition Container */}
        <div className="flex flex-col items-center gap-6 md:gap-8 max-md:flex-col px-4 overflow-hidden">
          {/* Depositions */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-full">
            {depositions
              .slice(currentIndex, currentIndex + 3)
              .map((deposition, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-full md:w-[250px] flex-grow max-w-[250px]"
                >
                  <img
                    loading="lazy"
                    src={`data:image/jpeg;base64,${deposition.imageDep}`}
                    className="w-[120px] h-[160px] md:w-[180px] md:h-[240px] rounded-full object-cover mb-2 md:mb-4"
                  />

                  <div className="text-center mt-2 text-white w-full">
                    <div className="max-w-full px-4">
                      <div className="bg-white rounded-lg overflow-hidden">
                        <p className="text-sm md:text-base text-black leading-5 md:leading-6 mb-1 md:mb-2 h-[120px] md:h-[160px] overflow-hidden break-words whitespace-normal">
                          {deposition.depoimento.length > maxChars
                            ? `${deposition.depoimento.slice(0, maxChars)}...`
                            : deposition.depoimento}
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 text-xs md:text-base italic leading-5 md:leading-6 text-gray-500">
                      — {deposition.autorDepo}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="pr-8">
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center md:right-4 md:transform-none max-md:right-[16px] max-md:-translate-y-1/2">
            <img
              loading="lazy"
              src="/icones/setadireita.svg"
              className="shrink-0 w-8 md:w-12 aspect-square cursor-pointer"
              onClick={handleNext}
            />
          </div>
        </div>
      </div>
      <div className="pt-8">
        <div className="flex gap-1 px-4 py-2.5  text-base text-center text-white bg-blue-800 rounded">
          <div className="grow">Escreva um depoimento </div>
          <div className="flex align-items">
          <img
            loading="lazy"
            src="/icones/lapis.svg"
            className="object-contain shrink-0 self-start w-4 aspect-square"
          />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 text-xl pt-4 text-center">
        <div className="flex-auto text-black">
          Veja mais vídeos de nosso alunos
        </div>
        <div className="grow self-start text-blue-600 w-fit">
          acessar depoimentos
        </div>
      </div>
    </div>
  );
};

export default Depositions;
