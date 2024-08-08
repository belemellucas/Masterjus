"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Card from "../course/Course";
import Search from "../Search";
import Link from "next/link";
import MenuItems from "../menuItems/MenuItems";
import HamburgerMenu from "../HamburgerMenu";

function Header({categoriesData}) {
  const [showSearch, setShowSearch] = useState(false);
  const [isCursosSubMenu, setIsCursosSubMenu] = useState(false);
  const subMenuRef = useRef(null); 
  const buttonRef = useRef(null);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const menuOptions = [
    { name: "Home" },
     {
      name: "CURSOS",
      hasSubMenu: true,
       subMenuOptions: Array.isArray(categoriesData) 
       ? categoriesData.map(category => ({
        name: category.NomeCat,
          href: "/category" + encodeURIComponent(category.NomeCat),
      }))
     : [] 
    },
    { name: "PrevEvolution", href: "/prevevolution/" + encodeURIComponent("Materiais Gratuitos") },
    { name: "Materiais Gratuitos", href:"/freeCourses" },
    { name: "BLOG", href: "/blog/page" },
    { name: "Livros/e-books", href: "/ebooks/" + encodeURIComponent("Ebooks") },
    { name: "Fale Conosco", href: "/contact-use"},
  ];

  

  const handleCursosClick = (event) => {
    event.stopPropagation(); 
    setIsCursosSubMenu((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      subMenuRef.current &&
      !subMenuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsCursosSubMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside); 
    return () => {
      document.removeEventListener("click", handleClickOutside); 
    };
  }, []);

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

        {/* Menu completo para telas grandes 
        <div className="hidden md:flex">
          <MenuItems categoriesData={categories}/>
        </div>*/}
     {/* novo menu itens */}
        <div className="hidden md:flex">
        <div className="flex gap-5 justify-between items-start w-full max-w-[1160px] max-md:flex-wrap max-md:max-w-full items-center">
  <Image
    loading="lazy"
    src="/logo/logo-master.png"
    alt="Logo"
    width={200}
    height={50}q
  />
  <div className="flex flex-wrap max-w-[900px] text-sm font-semibold tracking-wider leading-5 uppercase text-neutral-700">
    <ul className="flex gap-x-4 gap-y-2 whitespace-nowrap">
      {menuOptions.map((option, index) => (
        <li
          key={index}
          className="relative flex-shrink-0 mr-4 hover:text-neutral-900"
        >
          {option.hasSubMenu ? (
            <>
              <button
                onClick={handleCursosClick}
                ref={buttonRef}
                className="flex items-center"
              >
                {option.name}
              </button>
              {isCursosSubMenu && (
                <ul 
                  ref={subMenuRef}
                  className="absolute top-full left-0 mt-2 bg-gray-200 border border-gray-300 shadow-lg rounded-lg w-48 z-10"
                >
                  {option.subMenuOptions.map((subItem, subIndex) => (
                    <li key={subIndex} className="p-2 hover:bg-gray-300">
                      <Link href={subItem.href || "/"}>{subItem.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <Link href={option.href || "/"}>{option.name}</Link>
          )}
        </li>
      ))}
    </ul>
  </div>
  <div className="flex gap-4">
    <Link href="/cart">
      <Image
        loading="lazy"
        src="/icones/carrinho.svg"
        alt="Icone Carrinho"
        width={19}
        height={19}
      />
    </Link>
    <Link href="/registerUser">
      <Image
        loading="lazy"
        src="/icones/user.svg"
        alt="Icone Usuário"
        width={19}
        height={19}
      />
    </Link>
  </div>
</div>
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
