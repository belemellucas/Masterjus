import Image from "next/image"



function Card() { 
    const card1 = {
        categoria: 'Pós-Graduação',
        originalPrice: 'R$ 1.800,00',
        discountedPrice: 'R$ 1.713,84',
        installmentPlan: '12 x de R$ 142,82 sem juros',
        enrollText: 'MATRICULE-SE',
        cardImage: '/imagens/card-course.png',
        dividerImage: '/icones/Horizontal Divider.svg',
        paymentIcons: [
          'https://cdn.builder.io/api/v1/image/assets/TEMP/762c62323dcb14e78992f90024b9738e0f1da0799023b03410e90301c9a34dd0?',
          'https://cdn.builder.io/api/v1/image/assets/TEMP/ebaaebb54b1056061a97dd735cee7dc37ac9b627d3e06e71cca04d6b1b2adacb?',
          'https://cdn.builder.io/api/v1/image/assets/TEMP/94d8988a55db159696fc299a9d84ae3b4d57d357122a7372338123b322e07db9?',
          'https://cdn.builder.io/api/v1/image/assets/TEMP/6462c7e3479c4d57e52094108ce6405dc4eb31e53ef82f04e69a2f21f35b9b2d?',
          'https://cdn.builder.io/api/v1/image/assets/TEMP/365e4c6c16ce974cd06cbafe24150ffc4c0625a47e788fca08591151681423c3?',
        ],
      };
      
    return (
        <div className="flex flex-col justify-start items-start px-16 pb-6 mt-14 mx-auto bg-zinc-100 max-md:px-5 max-md:mt-10 min-h-screen">
        <div className="flex">
          <div className="relative ml-12 w-[278.2px] h-[50px] bg-[#F1F1F1]">
            <div className="absolute w-[262.2px] h-[50px] left-0 top-0 bg-[#200140] rounded-[7px] flex items-center justify-center">
              <span className="absolute w-[230.58px] h-[42px] left-[16px] top-[3.5px] font-poppins font-bold text-[28px] leading-[42px] text-center text-white flex items-center">
                Pós-Graduação
              </span>
            </div>
          </div>
          <div className="pl-20 flex">
            <Image
              loading="lazy"
              src="/icones/Horizontal Divider.svg"
              alt="img divider"
              width={1270}
              height={50}
            />
          </div>
        </div>
        <div className="flex flex-col ml-10 max-w-[307px]">
          <div className="flex flex-col justify-center text-2xl font-bold leading-8 text-center text-white whitespace-nowrap bg-zinc-100 relative"></div>
        
          <div className="flex flex-col px-6 py-7 mt-10 w-full bg-white rounded-2xl border border-solid border-zinc-100 max-md:px-5">
            <Image
              loading="lazy"
              src="/imagens/card-course.png"
              alt="img card"
              width={229}
              height={229}
            />
            <div className="flex gap-5 justify-between px-px mt-5 text-sm">
              <div className="flex flex-col my-auto leading-5 text-indigo-950">
                <div>
                  De
                  <span className="font-semibold line-through">
                    R$ 1.800,00
                  </span>
                </div>
                <div className="mt-3">
                  por <span className="font-semibold">R$ 1.713,84</span>
                </div>
              </div>
              <div className="flex flex-col text-right text-rose-500 leading-[135%]">
                <div className="text-indigo-950">12 x de</div>
                <div className="mt-2 text-base font-bold">R$ 142,82</div>
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
        </div>
    )
}
export default Card 
