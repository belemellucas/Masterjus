"use client";
import Image from "next/image";
import React, { useState } from "react";
import Card from "../course/Course";
import Search from "../Search";
import Link from "next/link";
import MenuItems from "../menuItems/MenuItems";
import HamburgerMenu from "../HamburgerMenu";

function Header() {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      {/* Barra superior com ícones e pesquisa */}
      <div className="w-full overflow-hidden bg-[#0402a7] hidden md:flex">
        <div className="flex justify-center items-center px-16 py-3 w-full text-base text-white max-md:px-5 max-md:max-w-full">
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
            <div className="flex gap-5 justify-between items-center text-right leading-[150%] max-md:flex-col max-md:items-start">
              {showSearch && <Search />}
              <Image
                loading="lazy"
                src="/icones/Icon2.svg"
                alt="Icon 3"
                width={19}
                height={19}
                onClick={toggleSearch}
                className="cursor-pointer"
              />
              <div className="flex gap-3">
                <Link href="/auth/login">
                  <Image
                    loading="lazy"
                    src="/icones/Icon.svg"
                    alt="Icon 3"
                    width={22}
                    height={22}
                  />
                </Link>
                <div className="flex-auto my-auto font-poppins">
                  PORTAL DO ALUNO
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="flex justify-between md:justify-center items-center px-16 py-3 bg-white max-md:px-5">
        <div className="flex items-center md:hidden">
          <Image
            src="/logo/logo-master.png"
            alt="Logo"
            width={120}
            height={40}
          />
        </div>

        {/* Menu completo para telas grandes */}
        <div className="hidden md:flex">
          <MenuItems />
        </div>

        {/* Menu hamburger para telas pequenas */}
        <div className="flex md:hidden items-center">
          <HamburgerMenu />
        </div>
      </header>
    </>
  );
}

export default Header;
