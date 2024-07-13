import Image from "next/image";
import React from "react";
import Card from "../card/Card";
import Search from "../Search";

function Header() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-center items-center px-16 py-3 w-full text-base text-white bg-blue-800 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between max-w-full w-[1158px] max-md:flex-wrap">
          <div className="flex gap-5 my-auto whitespace-nowrap leading-[100%]">
            <div>
              <Image
                loading="lazy"
                src="/icones/icone-facebook.svg"
                alt="Icon 1"
                width={19}
                height={19}
              />
            </div>
            <div>
              <Image
                loading="lazy"
                src="/icones/icone-instagram.svg"
                alt="Icon 2"
                width={19}
                height={19}
              />
            </div>
            <div>
              <Image
                loading="lazy"
                src="/icones/icone-youtube.svg"
                alt="Icon 3"
                width={19}
                height={19}
              />
            </div>
          </div>
          <div className="flex gap-5 justify-between items-center text-right leading-[150%]">
          <Search />
            <Image
              loading="lazy"
              src="/icones/Icon2.svg"
              alt="Icon 3"
              width={19}
              height={19}
            />
            <div className="flex gap-3">
              <Image
                loading="lazy"
                src="/icones/Icon.svg"
                alt="Icon 3"
                width={22}
                height={22}
              />
              <div className="flex-auto my-auto font-poppins">
                PORTAL DO ALUNO
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
