import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div>
      <div className="justify-center items-center px-16 py-3.5 text-2xl font-medium leading-7 text-center text-white bg-black max-md:px-5">
        Venha fazer parte!
      </div>
      <div className="flex flex-col">
        <div className="flex justify-around gap-5 items-start self-center px-5 max-w-full w-[1034px] max-md:flex-wrap pt-8">
          <div>
            <div className="flex flex-col self-stretch">
              <Image
                loading="lazy"
                src="/logo/logo-master.png"
                alt="Logo"
                width={200}
                height={50}
              />
              <div className="flex z-10 gap-5 justify-between items-start mt-0 pt-4 text-base leading-3 text-neutral-600">
                <Image
                  loading="lazy"
                  src="/icones/localizacao.svg"
                  alt="localizacao"
                  width={24}
                  height={24}
                />
                <div className="flex flex-col mt-1.5">
                  <div>Praça da Sé, 96 404</div>
                  <div className="mt-3">Sé - São Paulo - SP</div>
                  <div className="mt-4">CEP 01.001-001</div>
                </div>
              </div>
              <div className="flex gap-5 mt-5  items-center">
                <div className="text-2xl leading-6 text-stone-400">
                  <Image
                    loading="lazy"
                    src="/icones/iconewhatsapp.svg"
                    alt="localizacao"
                    width={34}
                    height={34}
                  />
                </div>
                <div className="flex-auto text-xl font-semibold leading-4 text-neutral-600">
                  (11) 95466-5200
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 mt-3 text-neutral-600">
            <div className="flex flex-col">
              <div className="text-base font-semibold leading-5">
                Acesso Rápido
              </div>
              <div className="mt-6 text-sm leading-5">Carrinho</div>
            </div>
            <div className="flex flex-col">
              <div className="text-base font-semibold leading-5">Contato</div>
              <div className="mt-7 text-sm leading-5">Perguntas Frequentes</div>
            </div>
            <div className="flex-auto text-base font-semibold leading-5">
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
              <div>
                {" "}
                <Image
                  loading="lazy"
                  src="/icones/facebook-icone-gris.png"
                  alt="icone-facebook"
                  width={20}
                  height={20}
                />
              </div>
              <div>
                {" "}
                <Image
                  loading="lazy"
                  src="/icones/instagram-icone-gris.png"
                  alt="icone-instagram"
                  width={20}
                  height={20}
                />
              </div>
              <div>
                <Image
                  loading="lazy"
                  src="/icones/youtube-icone-gris.png"
                  alt="icone-youtube"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <Image
              loading="lazy"
              src="/imagens/pagamentos.png"
              alt="pagamentos"
              width={465}
              height={37}
            />
          </div>
        </div>

        <div className="flex justify-center items-center px-16 py-16 w-full text-sm font-light leading-5 text-center bg-blue-600 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-3 max-md:flex-wrap items-end">
            <div className="flex flex-auto gap-3 text-white max-md:flex-wrap items-end">
              <div>Copyright © 2024</div>
              <div className="mt-3">.</div>
              <div className="flex-auto">
                MasterJus editora e inteligência educacional ltda
              </div>
              <div className="mt-3">.</div>
              <div className="flex-auto">CNPJ 41.708.941/0001-61</div>
              <div className="mt-3">.</div>
              <div className="flex-auto">Todos os direitos reservados</div>
              <div className="mt-3">.</div>
              <div className="flex gap-1">
                <div className="text-white">Desenvolvido por</div>
                <div className="text-blue-600">TUTOR</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
