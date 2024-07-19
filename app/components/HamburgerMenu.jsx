"use client"
import { useState } from "react";
import Link from "next/link";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <ul className="flex flex-col">
            <li>
              <Link href="/card" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Card</Link>
            </li>
            <li>
              <Link href="/blogs" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Blogs</Link>
            </li>
            <li>
              <Link href="/infoSite" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">InfoSite</Link>
            </li>
            <li>
              <Link href="/testimonials" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Depoimentos</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
