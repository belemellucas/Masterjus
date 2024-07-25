// src/admin/layout.js
'use client'

import { useState } from 'react'
import Sidebar from './page'
import Image from 'next/image'
import Link from 'next/link'

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
  <div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow p-6">
        <button onClick={toggleSidebar} className="md:hidden fixed top-4 left-4 z-50">
          ☰
        </button>
        {children}
      </div>
     
    </div>
  )
}

export default AdminLayout

