"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function MenuItems() {
  const menuOptions = [
    { name: "Home" },
    {
      name: "CURSOS",
      hasSubMenu: true,
      subMenuOptions: [
        { name: "PÓS-GRADUAÇÃO", href: "/category/" + encodeURIComponent("PÓS-GRADUAÇÃO") },
        { name: "PRÁTICAPREV", href: "https://masterjus.com/praticaprev/" },
        { name: "CURSOS PRESENCIAIS", href: "/category/" + encodeURIComponent("CURSOS PRESENCIAIS") },
        { name: "CURSOS DE PRÁTICA", href: "/category/CURSOS DE PRÁTICA" },
      ],
    },
    { name: "PrevEvolution" },
    { name: "Mat. Gratuitos" },
    { name: "BLOG" },
    { name: "Livros/e-books" },
    { name: "Fale Conosco" },
  ];

  const [isCursosSubMenu, setIsCursosSubMenu] = useState(false);

  const handleCursosClick = () => {
    setIsCursosSubMenu(!isCursosSubMenu);
  };

  return (
    <div className="flex gap-5 justify-between items-start w-full max-w-[1160px] max-md:flex-wrap max-md:max-w-full">
      <Image
        loading="lazy"
        src="/logo/logo-master.png"
        alt="Logo"
        width={200}
        height={50}
      />
      <div className="flex flex-wrap max-w-[800px] text-sm font-semibold tracking-wider leading-5 uppercase text-neutral-700">
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {menuOptions.map((option, index) => (
            <li
              key={index}
              className="relative flex-shrink-0 mr-4 hover:text-neutral-900"
            >
              {option.hasSubMenu ? (
                <>
                  <button
                    onClick={handleCursosClick}
                    className="flex items-center"
                  >
                    {option.name}
                  </button>
                  {isCursosSubMenu && (
                    <ul className="absolute top-full left-0 mt-2 bg-gray-200 border border-gray-300 shadow-lg rounded-lg w-48 z-10">
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
      <div className="flex gap-4 self-stretch my-auto mt-2">
            <Image
              loading="lazy"
              src="/icones/carrinho.svg"
              alt="Icone Carrinho"
              width={19}
              height={19}
            />
            <Image
              loading="lazy"
              src="/icones/user.svg"
              alt="Icone Usuário"
              width={19}
              height={19}
            />
                   </div>
    </div>
  );
}

export default MenuItems;