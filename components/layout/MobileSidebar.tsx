'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import SidebarNav from './SidebarNav'

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)} className="ghost-btn p-2" aria-label="Open menu"><Menu size={20} /></button>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-80 max-w-[86%] h-full bg-card border-r border-line p-5 flex flex-col shadow-2xl overflow-y-auto">
            <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 ghost-btn p-2" aria-label="Close menu"><X size={20} /></button>
            <SidebarNav onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
