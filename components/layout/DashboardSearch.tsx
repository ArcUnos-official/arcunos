'use client'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { appModules } from '@/lib/modules'

export default function DashboardSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return []
    return appModules.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      m.short.toLowerCase().includes(q) ||
      m.desc.toLowerCase().includes(q) ||
      m.tools.some((t) => t.name.toLowerCase().includes(q))
    ).slice(0, 8)
  }, [query])

  const go = (id: string) => {
    setQuery('')
    setOpen(false)
    router.push(`/dashboard/${id}`)
  }

  return (
    <div className="relative flex-1 max-w-xl">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
      <input value={query} onChange={(e) => { setQuery(e.target.value); setOpen(true) }} onFocus={() => setOpen(true)} placeholder="Search modules, tools, resume, pdf, SEO..." className="w-full bg-white/5 border border-line rounded-xl pl-9 pr-4 py-2 text-sm text-text outline-none focus:border-violet transition" />
      {open && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-line rounded-2xl shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto">
          {results.length ? results.map((m) => (
            <button key={m.id} onClick={() => go(m.id)} className="w-full text-left p-4 hover:bg-white/10 transition border-b border-line last:border-b-0">
              <div className="font-bold text-text flex items-center gap-2"><span>{m.icon}</span>{m.name}</div>
              <div className="text-xs text-muted mt-1">{m.desc}</div>
              <div className="text-[11px] text-muted mt-2">Tools: {m.tools.slice(0, 3).map(t => t.name).join(', ')}</div>
            </button>
          )) : <div className="p-4 text-sm text-muted">No result found. Try “resume”, “pdf”, “seo”, “image”, or “student”.</div>}
        </div>
      )}
    </div>
  )
}
