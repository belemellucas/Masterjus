"use client";

import React, { useState } from "react";
import SidebarAdmin from "../sidebar/SidebarAdmin";
import Image from "next/image";

const ClientLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex">
      <SidebarAdmin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow p-6">
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="md:hidden fixed top-4 left-4 z-50 p-1"
          >
            <Image
              loading="lazy"
              src="/icones/menu-hamburguer.svg"
              alt="Logo"
              width={20}
              height={20}
            />
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default ClientLayout;
