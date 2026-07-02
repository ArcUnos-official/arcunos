'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { appModules } from '@/lib/modules'
import JarvisCore from '@/components/layout/JarvisCore'

type Props = { userName: string }

export default function DashboardHomeClient({ userName }: Props) {
  const [theme, setTheme] = useState<'gold' | 'light'>('gold')
  const firstName = userName.split(' ')[0] || 'User'

  useEffect(() => {
    const read = () => setTheme(document.body.classList.contains('theme-light') ? 'light' : 'gold')
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const greeting = useMemo(() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    if (h < 21) return 'Good Evening'
    return 'Good Night'
  }, [])

  const visibleModules = appModules.slice(0, 17)

  return (
    <div className="dashboard-reference relative max-w-[1800px] mx-auto z-10 space-y-6 select-none">
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start min-h-[680px]">
        <aside className="xl:col-span-3 flex flex-col gap-6 h-full">
          <div className="dash-glass-card rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xs uppercase tracking-widest font-semibold opacity-70">AI Analytics Matrix</h2>
              <span className="text-xs font-bold text-violet">18.3% Peak</span>
            </div>
            <div className="relative w-32 h-32 mx-auto my-2 flex items-center justify-center">
              <JarvisCore size="small" />
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-white/[0.04]"><span className="opacity-60">Neural Threads</span><span className="font-medium">1,240 / Sec</span></div>
              <div className="flex justify-between p-2 rounded-lg bg-white/[0.04]"><span className="opacity-60">Quantized Latency</span><span className="font-medium">0.04ms</span></div>
            </div>
          </div>

          <div className="dash-glass-card rounded-2xl p-5 flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest font-semibold opacity-70 mb-1">Active Worker Pools</h2>
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {['Task Automation Engine', 'Vector Embeddings Mapping', 'Data Extraction Protocol'].map((item, i) => (
                <div key={item} className="p-3 rounded-xl border border-white/5 flex items-center justify-between transition-colors hover:bg-white/[0.04] bg-white/[0.03]">
                  <div className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-violet" /><div><p className="text-xs font-semibold">{['Anayritsoe Node','Alesthors Proxy','Crumas Indexer'][i]}</p><p className="text-[10px] opacity-50">{item}</p></div></div>
                  <span className="text-xs opacity-80">{['82%','45%','Idle'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="xl:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-6 relative min-h-[680px]">
          <div className="md:col-span-12 dash-glass-card rounded-xl p-3 flex items-center gap-3 px-4">
            <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Query orchestration system, search tools, deploy model endpoints..." className="w-full bg-transparent text-sm focus:outline-none placeholder:opacity-50" />
          </div>

          <div className="md:col-span-12 dash-glass-card rounded-3xl p-6 md:p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,color-mix(in_srgb,var(--violet)_18%,transparent),transparent_42%)]" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2">ArcUnos Live Interface Engine</p>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{greeting}, <span className="text-violet">{firstName}</span> 👋</h1>
                <p className="mt-3 max-w-2xl text-muted">Your AI operating system is online. Search, open modules, run tools, and continue work from one living command space.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="dash-stat"><b>30</b><small>Modules</small></span>
                  <span className="dash-stat"><b>162</b><small>Tools</small></span>
                  <span className="dash-stat"><b>LIVE</b><small>Engine</small></span>
                </div>
              </div>
              <JarvisCore />
            </div>
          </div>

          <Link href="/dashboard/profile" className="md:col-span-4 dash-glass-card rounded-2xl p-5 self-center hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-4"><h3 className="text-xs uppercase tracking-widest font-bold">Profile & DP</h3><span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">v3-Live</span></div>
            <p className="text-xs opacity-70 mb-3 font-light">View and update your account profile, display picture and saved workspace.</p>
          </Link>

          <div className="md:col-span-4 min-h-[180px] flex items-center justify-center relative">
            <div className="text-center z-10 pointer-events-auto bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
              <p className="text-[10px] uppercase tracking-widest opacity-60">Central Brain Core</p>
              <p className="text-xs font-semibold tracking-wide text-violet">Looping 24/7 Engine</p>
            </div>
          </div>

          <Link href="/dashboard/settings" className="md:col-span-4 dash-glass-card rounded-2xl p-5 self-center flex flex-col gap-4 hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between"><h3 className="text-xs uppercase tracking-widest font-bold">Interface Settings</h3><span className="w-2 h-2 rounded-full bg-green animate-ping" /></div>
            <p className="text-xs opacity-70">Themes, preferences, privacy and app settings.</p>
            <span className="w-full text-xs font-semibold py-2 rounded-xl transition-all border border-dashed text-center opacity-80 text-violet border-violet/40">Open Settings</span>
          </Link>

          <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
            {visibleModules.slice(0, 5).map((m, i) => (
              <Link key={m.id} href={`/dashboard/${m.id}`} className={`absolute ${['top-[20%] left-[24%]','top-[15%] left-[52%]','top-[38%] left-[72%]','bottom-[28%] left-[28%]','bottom-[20%] left-[58%]'][i]} live-node pointer-events-auto cursor-pointer dash-glass-card px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 shadow-sm`}>
                <span className="w-1.5 h-1.5 rounded-full bg-violet" /> {m.short || m.name}
              </Link>
            ))}
          </div>
        </main>
      </section>

      <section>
        <h3 className="text-xl font-bold text-text mb-4">All Modules <span className="text-muted text-sm font-normal">({appModules.length} active)</span></h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {appModules.map((m) => (
            <Link href={`/dashboard/${m.id}`} key={m.id} className="group dash-glass-card module-tile p-5 hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col justify-between min-h-[190px]">
              <div>
                <div className="flex items-center justify-between mb-4"><span className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet to-violet2 flex items-center justify-center text-2xl">{m.icon}</span><span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green/10 text-green uppercase border border-green/20">Ready</span></div>
                <b className="block text-text text-base mb-1 leading-snug break-words whitespace-normal">{m.name}</b><p className="text-sm text-muted leading-tight break-words whitespace-normal">{m.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="flex flex-wrap justify-between items-center text-[11px] opacity-50 mt-6 pt-4 border-t border-white/5">
        <div>ArcUnos Operating Platform Architecture v3.4.0-Production</div>
        <div className="flex gap-4"><span>Cluster Load: 42%</span><span>Engine Throughput: 4K Ultra Fluid</span></div>
      </footer>
    </div>
  )
}
