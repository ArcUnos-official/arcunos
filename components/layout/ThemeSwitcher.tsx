'use client'
import { useEffect, useState } from 'react'
import { Palette } from 'lucide-react'

const themes = [
  { id: 'gold', label: 'Black Gold' },
  { id: 'light', label: 'Icy Blue' },
]

export default function ThemeSwitcher() {
  const [current, setCurrent] = useState('gold')

  useEffect(() => {
    const saved = localStorage.getItem('arcunos.theme') || 'gold'
    applyTheme(saved)
  }, [])

  const applyTheme = (theme: string) => {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-gold', 'theme-purple')
    document.body.classList.add(theme === 'light' ? 'theme-light' : 'theme-gold')
    localStorage.setItem('arcunos.theme', theme)
    setCurrent(theme)
  }

  const toggleTheme = () => applyTheme(current === 'gold' ? 'light' : 'gold')

  return (
    <button onClick={toggleTheme} className="ghost-btn px-3 py-2 flex items-center gap-2" title="Switch theme">
      <Palette size={18} /> <span className="hidden lg:inline text-xs font-bold">{current === 'gold' ? 'Black Gold' : 'Icy Blue'}</span>
    </button>
  )
}
