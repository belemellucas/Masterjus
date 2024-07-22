function Depositions({ depositions, infoSite }) {
  // const getYoutubeEmbedUrl = (url) => {
  //     const videoId = url.split('v=')[1];
  //     const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  //     return embedUrl;
  //   };
  return (
    <>
      {/*<div className="relative w-[1200px] h-[555px] left-1/2 transform -translate-x-1/2 top-[4862.09px]">
      <div className="absolute w-[557.4px] h-[48px] left-1/2 transform -translate-x-1/2 top-[45px] font-poppins font-extrabold text-4xl leading-10 flex items-center text-center text-black">
        DEPOIMENTOS DOS ALUNOS
      </div>

      <div className="absolute h-[334px] left-[15px] right-[15px] top-[135px] flex items-start gap-3">
        <div className="absolute w-[217px] h-[294px] left-[64px] top-[24px] rounded-full bg-cover bg-center overflow-hidden">
          <Image
            src={`data:image/jpeg;base64,${depositions[currentIndex].imageDep}`}
            alt="Imagem do aluno"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <div className="absolute h-[258px] left-[297px] right-[64px] top-[24px]">
          <div className="absolute w-[60px] h-[61px] left-0 top-[60px] transform -scale-y-100">
            <Image
              src="/icones/frase.svg"
              alt="Ícone de frase"
              className="shrink-0 aspect-square"
              width={60}
              height={61}
            />
          </div>

          <div className="absolute w-[682.83px] h-[60px] left-[78px] top-0 font-poppins text-xl leading-[30px] text-[#929090] flex items-center">
            {depositions[currentIndex].depoimento}
          </div>

          <div className="absolute w-[739.18px] h-[90px] left-0 top-[60px] font-poppins text-xl leading-[30px] text-[#929090] flex items-center">
            {depositions[currentIndex].descricao}
          </div>

          <div className="absolute w-[740.2px] h-[60px] left-0 top-[174px] font-poppins text-xl leading-[30px] text-[#929090] flex items-center">
            {depositions[currentIndex].pratica}
          </div>

          <div className="absolute h-[24px] left-0 top-[234px] flex items-center">
            <div className="absolute w-[117.08px] h-[24px] left-0 top-[-0.5px] font-poppins text-lg leading-6 text-[#6C757D] flex items-center">
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

      <div className="absolute w-[241.92px] h-[38px] left-1/2 transform -translate-x-1/2 top-[calc(50% + 234.5px)] bg-[#0402A7] rounded px-4 py-2.5 text-base leading-6 text-center text-white flex justify-center items-center gap-1 cursor-pointer">
        Escreva um depoimento
        <Image
          src="/icones/lapis.svg"
          alt="Ícone de lápis"
          width={16}
          height={16}
        />
      </div>
    </div>
    */}

      <div className="flex justify-center pt-10 pb-10">
        <div className="flex gap-2.5 items-center px-5 max-md:flex-wrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/39f1fe8b09732fb1dd577b372ce76f2daaefe654a0db3c7c2a2b3df6dc0d34ae?"
            className="shrink-0 self-stretch my-auto w-12 aspect-square"
          />
          {depositions[currentIndex] && (
            <img
              loading="lazy"
              src={`data:image/jpeg;base64,${depositions[currentIndex].imageDep}`}
              className="shrink-0 self-stretch my-auto max-w-full aspect-[0.74] w-[210px] h-[280px] rounded-full object-cover"
            />
          )}

          <div className="flex flex-col self-stretch max-md:max-w-full">
            <div className="self-start ml-3 text-4xl font-extrabold leading-10 text-center text-black max-md:max-w-full">
              DEPOIMENTOS DOS ALUNOS
            </div>
            <div className="flex gap-5 mt-20 text-xl leading-8 text-stone-400 max-md:flex-wrap max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8eccec54b85373e583f5a92397a197b91fa21b9e4d073fb484382b1ccfba97dc?"
                className="shrink-0 aspect-[0.98] w-[60px]"
              />
              <div className="flex-auto max-md:max-w-full">
                Estou entrando no mundo das mentorias e aulas nesse ano, e como
                <br />
                mentora ensinando direito previdenciário para alguns colegas
              </div>
            </div>
            <div className="flex gap-5 items-start mt-1.5 text-xl leading-8 text-stone-400 max-md:flex-wrap max-md:max-w-full">
              <div className="flex-auto self-start max-md:max-w-full">
                advogados. Iniciei com essa prática assistindo o PrevEvolution.
                Foi muito
                <br />
                bacana fazer parte dessa comunidade, e me identificar com o
                gosto pelo
                <br />
                ensino do previdenciário. Meus parabéns pelo projeto.
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/246ed5d3ca7f36f1baba6a7a417442ce59b4b9ebfa32dc1e466821657a4ae6e7?"
                className="shrink-0 self-end mt-14 w-12 aspect-square max-md:mt-10"
              />
            </div>
            <div className="mt-3.5 text-xl leading-8 text-stone-400 max-md:max-w-full">
              Iniciei com a prática de mentorias para colegas advogados
              assistindo ao
              <br />
              PrevEvolution!
            </div>
            <div className="mt-3.5 text-base italic leading-6 text-gray-500 max-md:max-w-full">
              — <span className="italic">Angela Silva</span>
            </div>
            <div className="flex flex-col mt-7 ml-36 max-w-full w-[282px] max-md:ml-2.5">
              <div className="flex gap-1.5">
                <div className="shrink-0 bg-white h-[3px] w-[30px]" />
                <div className="shrink-0 bg-white h-[3px] w-[30px]" />
                <div className="shrink-0 bg-white h-[3px] w-[30px]" />
                <div className="shrink-0 bg-white h-[3px] w-[30px]" />
                <div className="shrink-0 bg-white h-[3px] w-[30px]" />
                <div className="shrink-0 bg-white h-[3px] w-[30px]" />
                <div className="shrink-0 bg-white h-[3px] w-[30px]" />
                <div className="shrink-0 bg-white h-[3px] w-[30px]" />
              </div>
              <div className="flex gap-1 justify-center px-4 py-2.5 mx-5 mt-12 text-base leading-6 text-center text-white bg-blue-800 rounded max-md:mx-2.5 max-md:mt-10">
                <div className="grow">Escreva um depoimento </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f1e35e031041ce9140c0b5f330619e5dc3e3d8f5c3c77f7a6cb95ef7a72258e?"
                  className="shrink-0 self-start w-4 aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Depositions;
