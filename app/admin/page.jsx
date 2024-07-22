'use client'
// src/components/Sidebar.js
import Link from 'next/link'
import { useState } from 'react'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:block`}>
      <div className="p-4 text-2xl font-semibold flex justify-between items-center">
        MasterJus Admin
        <button onClick={toggleSidebar} className="md:hidden">
          ✕
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/admin/card">Card</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/admin/blogs">Blogs</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/admin/infoSite">InfoSite</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/admin/depoimentos">Depoimentos</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
