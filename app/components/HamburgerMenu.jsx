"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false); 
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside); 
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); 
    }; 
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        className="text-gray-700 focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out">
          <div
            ref={menuRef}
            className={`bg-black w-64 h-full p-5 transform transition-transform duration-500 ease-in-out ${
              isOpen ? "translate-x-0 scale-100" : "translate-x-full scale-95"
            }`}
          >
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="flex flex-col mt-5 space-y-2">
              <li>
                <Link href="/card" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200">HOME</Link>
              </li>
              <li>
                <Link href="/blogs" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200">CURSOS</Link>
              </li>
              <li>
                <Link href="/infoSite" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200">PREVEVOLUTION</Link>
              </li>
              <li>
                <Link href="/testimonials" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200">MAT.GRATUITOS</Link>
              </li>
              <li>
                <Link href="/testimonials" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200">BLOG</Link>
              </li>
              <li>
                <Link href="/testimonials" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200">LIVROS/E-BOOKS</Link>
              </li>
              <li>
                <Link href="/testimonials" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200">FALE CONOSCO</Link>
              </li>
              <li>
                <Link href="/testimonials" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200">CARRINHO</Link>
              </li>
              <li>
                <Link href="/testimonials" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200">PORTAL DO ALUNO</Link>
              </li>
              <li>
                <Link href="/testimonials" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200">DEIXE SEU CADASTRO</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
