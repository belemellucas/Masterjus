// src/admin/layout.js
'use client'

import { useState } from 'react'
import Sidebar from './page'

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow p-6 md:ml-64">
        <button onClick={toggleSidebar} className="md:hidden fixed top-4 left-4 z-50">
          ☰
        </button>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
