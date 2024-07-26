"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeaderAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 bg-gray-700`}
    >
      <div className="flex items-center">
        <Image
          src="/logo/logo-master.png" 
          alt="Logo"
          width={120} 
          height={40}
        />
      </div>
      {/* User Section */}
      <div className="flex gap-4">
        {/* User Image */}
        <div className="relative">
          <Image
            src="/icones/user-masterjus.svg" 
            alt="User"
            width={32}
            height={32}
            className="rounded-full cursor-pointer"
          />
        </div>

        {/* Tool Icon */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <Image
              src="/icones/settings.svg" // Substitua pelo caminho da imagem de configurações
              alt="Settings"
              width={32}
              height={32}
              className="rounded-full cursor-pointer"
            />
          </button>

          {/* Submenu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
              <ul className="py-1">
                <li>
                  <Link
                    href="/alterar-senha"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Alterar Senha
                  </Link>
                </li>
                <li>
                  <Link
                    href="/alterar-email"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Alterar Email
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Adicionar Imagem
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Painel
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
