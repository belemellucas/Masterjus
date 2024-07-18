import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div>
      <div className="justify-center items-center px-16 py-3.5 text-2xl font-medium leading-7 text-center text-white bg-black max-md:px-5">
        Venha fazer parte!
      </div>
      <div className="flex flex-col">
        <div className="flex justify-around gap-5 items-start self-center px-5 max-w-full w-[1034px] max-md:flex-wrap">
          <div>
          <div className="flex flex-col self-stretch">
            <img
              loading="lazy"
              srcSet="..."
              className="max-w-full aspect-[2.56] w-[180px]"
            />
            <div className="flex z-10 gap-5 justify-between items-start mt-0 text-base leading-3 text-neutral-600">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2768aeff38b7afd140675fe324559816b661f7b48aa0bdbd3c5171b8e8139996?"
                className="shrink-0 aspect-[0.77] w-[23px]"
              />
              <div className="flex flex-col mt-1.5">
                <div>Praça da Sé, 96 404</div>
                <div className="mt-3">Sé - São Paulo - SP</div>
                <div className="mt-4">CEP 01.001-001</div>
              </div>
            </div>
            <div className="flex gap-5 mt-5">
              <div className="text-2xl leading-6 text-stone-400"></div>
              <div className="flex-auto text-xl font-semibold leading-4 text-neutral-600">
                (11) 95466-5200
              </div>
            </div>
          </div>
          </div>
          <div>
          <div className="flex flex-col mt-3 text-neutral-600">
            <div className="text-base font-semibold leading-5">
              Acesso Rápido
            </div>
            <div className="mt-6 text-sm leading-5">Carrinho</div>
          </div>
          <div className="flex flex-col mt-3.5 text-neutral-600">
            <div className="text-base font-semibold leading-5">Contato</div>
            <div className="mt-7 text-sm leading-5">Perguntas Frequentes</div>
          </div>
          <div className="flex-auto mt-3 text-base font-semibold leading-5 text-neutral-600">
            Fale Conosco
          </div>
          </div>
        </div>
        <div className="flex flex-col items-center px-16 pt-5 pb-20 mt-16 w-full text-4xl leading-9 bg-white text-stone-400 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 justify-between mb-2 max-w-full w-[1156px] max-md:flex-wrap">
            <div className="flex gap-5 justify-between self-start">
              <div className="text-base font-semibold leading-5 text-center text-neutral-950">
                SIGA A GENTE NAS
                <br />
                REDES SOCIAIS
              </div>
              <div></div>
              <div></div>
              <div className="my-auto"></div>
            </div>
            <img
              loading="lazy"
              srcSet="..."
              className="aspect-[12.5] w-[465px] max-md:max-w-full"
            />
          </div>
        </div>
        <div className="flex justify-center items-center px-16 py-16 w-full text-sm font-light leading-5 text-center bg-blue-600 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-3 max-md:flex-wrap">
            <div className="flex flex-auto gap-3 text-white max-md:flex-wrap">
              <div>Copyright © 2024</div>
              <div className="self-start mt-3">.</div>
              <div className="flex-auto">
                MasterJus editora e inteligência educacional ltda
              </div>
              <div className="self-start mt-3">.</div>
              <div className="flex-auto">CNPJ 41.708.941/0001-61</div>
              <div className="self-start mt-3">.</div>
              <div className="flex-auto my-auto">
                Todos os direitos reservados{" "}
              </div>
              <div className="self-start mt-3">.</div>
            </div>
            <div className="flex gap-1 self-start">
              <div className="grow text-white">Desenvolvido por </div>
              <div className="text-blue-600">TUTOR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
