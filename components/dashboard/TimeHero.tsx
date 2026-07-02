'use client'

import { useEffect, useMemo, useState } from 'react'
import { appModules } from '@/lib/modules'
import JarvisCore from '@/components/layout/JarvisCore'

function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) return 'Good Morning'
  if (hour >= 12 && hour < 17) return 'Good Afternoon'
  if (hour >= 17 && hour < 21) return 'Good Evening'
  return 'Good Night'
}

export default function TimeHero({ userName = 'Guest' }: { userName?: string }) {
  const [greeting, setGreeting] = useState('Good Morning')
  const totalTools = useMemo(() => appModules.reduce((a, m) => a + m.tools.length, 0), [])

  useEffect(() => {
    const updateGreeting = () => setGreeting(getGreeting(new Date().getHours()))
    updateGreeting()
    const id = window.setInterval(updateGreeting, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="glass-card p-6 md:p-8 relative overflow-hidden min-h-[340px] jarvis-panel">
      <div className="jarvis-panel-glow" />
      <div className="relative z-10 grid lg:grid-cols-[1fr_260px] gap-8 items-center">
        <div>
          <p className="inline-flex items-center rounded-full border border-line bg-white/10 px-3 py-1 text-xs font-bold text-text backdrop-blur-md mb-4">
            ArcUnos Live Interface Engine
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-text mb-3 drop-shadow-sm">
            {greeting}, <span className="text-violet">{userName}</span> 👋
          </h2>
          <p className="text-muted text-lg max-w-2xl">
            Your AI operating system is online. Search, open modules, run tools, and continue work from one living command space.
          </p>
          <div className="grid grid-cols-3 gap-3 text-center mt-8 max-w-md">
            <div className="soft-card hero-stat p-3"><b>{appModules.length}</b><p className="text-xs text-muted">Modules</p></div>
            <div className="soft-card hero-stat p-3"><b>{totalTools}</b><p className="text-xs text-muted">Tools</p></div>
            <div className="soft-card hero-stat p-3"><b>LIVE</b><p className="text-xs text-muted">Engine</p></div>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <JarvisCore />
        </div>
      </div>
    </section>
  )
}
