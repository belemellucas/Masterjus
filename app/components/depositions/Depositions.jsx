"use client"

import Image from "next/image";
import React, { useState } from 'react';

function Depositions({ depositions }) {
  const [currentIndex, setCurrentIndex] = useState(0);

 // const { depoimento, autorDepo, imageDep } = depositions || {}
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : depositions.length -1)); 
  }
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex < depositions.length -1 ? prevIndex + 1 : 0));
  }
 return (
    <>
     <div className="flex flex-wrap gap-2 items-center justify-center px-4 max-md:flex-wrap mt-10">
      <div className="cursor-pointer" onClick={handlePrevClick}>
        <Image
          src="/icones/setaesquerda.svg"
          className="shrink-0 self-stretch my-auto w-12 h-12 aspect-square"
          width={24}
          height={24}
        />
      </div>
     
      <div className="flex flex-col self-stretch max-md:max-w-full">
        <div className="self-start ml-2 text-4xl font-extrabold leading-10 text-center text-black max-md:max-w-full">
          DEPOIMENTOS DOS ALUNOS
        </div>

        {depositions.length > 0 && (
          <div key={currentIndex} className="flex items-center">
            <div className="flex gap-4 text-xl leading-8 text-stone-400 max-md:flex-wrap max-md:mt-8">
              <Image
                src={`data:image/jpeg;base64,${depositions[currentIndex].imageDep}`}
                width={120}
                height={120}
                className="rounded-full"
              />
             
             
              
            </div>
            <div> 
              <div className="flex">
              <Image
                src="/icones/frase.svg"
                className="shrink-0 self-start w-4 h-4 aspect-square"
                width={32}
                height={32}
              />
               <div className="flex-auto max-md:max-w-full text-xl font-poppins text-[#929090]">
                {depositions[currentIndex].depoimento}
                </div>
                </div>
                <div className="mt-2 text-lg italic leading-7 text-gray-500 max-md:max-w-full">
              — <span className="italic">{depositions[currentIndex].autorDepo}</span>
            </div>
              </div>
            
           
          </div>
        )}
<div className="flex justify-center">
<div className="flex gap-1 justify-center px-4 py-2.5 w-[241.92px] text-base leading-6 text-center text-white bg-blue-800 rounded">
  <div className="grow">Escreva um depoimento</div>
  <Image
    src="/icones/lapis.svg"
    width={18}
    height={18}
  />
</div>
</div>

      </div>

      <div className="cursor-pointer" onClick={handleNextClick}>
        <Image
          src="/icones/setadireita.svg"
          className="shrink-0 self-stretch my-auto w-12 h-12 aspect-square"
          width={24}
          height={24}
        />
      </div>
    </div>
    </>
  );
}

export default Depositions;
