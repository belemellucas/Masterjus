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
    <div>
    <div className="relative w-[1200px] h-[555px] left-1/2 transform -translate-x-1/2 ">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-[557.4px] h-[48px] top-[45px] font-poppins font-extrabold text-4xl leading-10 text-center text-black flex items-center">
        DEPOIMENTOS DOS ALUNOS
      </div>

      <div className="absolute left-[15px] right-[15px] top-[135px] h-[334px] flex gap-3 items-start">
        <div className="relative w-[217px] h-[294px] left-[64px] top-[24px] rounded-full bg-cover bg-center">
          <Image
            src={`data:image/jpeg;base64,${depositions[currentIndex].imageDep}`}
            alt="Imagem do aluno"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <div className="relative left-[297px] right-[64px] top-[24px] h-[258px]">
          <div className="absolute w-[60px] h-[61px] left-[0px] top-[60px] transform -scale-y-100">
            <Image
              src="/icones/frase.svg"
              alt="Ícone de frase"
              className="shrink-0 self-start aspect-square"
              width={60}
              height={61}
            />
          </div>

          <div className="absolute left-0 top-0 w-[682.83px] h-[60px] font-poppins text-xl leading-[30px] text-[#929090] flex items-center">
            {depositions[currentIndex].depoimento}
          </div>
          
          <div className="absolute left-0 top-[60px] w-[739.18px] h-[90px] font-poppins text-xl leading-[30px] text-[#929090] flex items-center">
            {depositions[currentIndex].descricao}
          </div>
          
          <div className="absolute left-0 top-[174px] w-[740.2px] h-[60px] font-poppins text-xl leading-[30px] text-[#929090] flex items-center">
            {depositions[currentIndex].pratica}
          </div>
          
          <div className="absolute left-0 top-[234px] h-[24px]">
            <div className="absolute left-0 top-[-0.5px] w-[117.08px] h-[24px] font-poppins text-lg leading-6 text-[#6C757D] flex items-center">
              — {depositions[currentIndex].autorDepo}
            </div>
          </div>
        </div>

        <div className="absolute left-[1.25%] right-[93.75%] top-[135px] bottom-[86px] opacity-50 cursor-pointer" onClick={handlePrevClick}>
          <Image
            src="/icones/setaesquerda.svg"
            alt="Seta esquerda"
            className="shrink-0 self-stretch w-12 h-12 aspect-square"
            width={48}
            height={48}
          />
        </div>

        <div className="absolute left-[93.75%] right-[1.25%] top-[135px] bottom-[86px] opacity-50 cursor-pointer" onClick={handleNextClick}>
          <Image
            src="/icones/setadireita.svg"
            alt="Seta direita"
            className="shrink-0 self-stretch w-12 h-12 aspect-square"
            width={48}
            height={48}
          />
        </div>
        
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 w-[241.92px] h-[38px] top-[calc(50% + 234.5px)] bg-[#0402A7] rounded px-4 py-2.5 text-base leading-6 text-center text-white flex justify-center items-center gap-1 cursor-pointer">
        Escreva um depoimento
        <Image
          src="/icones/lapis.svg"
          alt="Ícone de lápis"
          width={16}
          height={16}
        />
      </div>
    </div>
   
    </div>
    

    </>
  );
}

export default Depositions;
