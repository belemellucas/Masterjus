'use client'
// src/components/Sidebar.js
import Link from 'next/link'
import { useState } from 'react'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
  <div className="flex">
         <div className="fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform -translate-x-full transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:block mt-[3.9rem] shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-80">
        <div className="p-4 text-2xl font-semibold flex justify-between items-center">
    <div className="pl-2"><h1>MasterJus Admin</h1></div>
    <button onClick={toggleSidebar} className="flex md:hidden">
      ✕
    </button>
  </div>
  <nav className="mt-0"> {/* Removido o mt-4 para eliminar o espaço em branco */}
    <ul>
      <li className="p-4 hover:bg-gray-700">
        <Link href="/admin/courses">Cursos</Link>
      </li>
      <li className="p-4 hover:bg-gray-700">
        <Link href="/admin/blogs">Blogs</Link>
      </li>
      <li className="p-4 hover:bg-gray-700">
        <Link href="/admin/infoSite">Imagens do Site</Link>
      </li>
      <li className="p-4 hover:bg-gray-700">
        <Link href="/admin/depositions">Depoimentos</Link>
      </li>
      <li className="p-4 hover:bg-gray-700">
        <Link href="/admin/categories">Categorias</Link>
      </li>
    </ul>
  </nav>
</div>
  </div>
   
  )
}

export default Sidebar
