import Link from 'next/link'
import { appModules } from '@/lib/modules'
import LogoMark from './LogoMark'

export default function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <Link href="/dashboard" onClick={onNavigate} className="flex items-center gap-3 mb-6">
        <LogoMark size={42} />
        <div>
          <h1 className="font-bold text-lg text-text leading-tight">ArcUnos</h1>
          <p className="text-xs text-muted">AI Operating System</p>
        </div>
      </Link>

      <nav className="space-y-2 flex-1">
        <p className="text-[11px] uppercase tracking-widest text-muted mb-3">Workspace</p>
        <Link onClick={onNavigate} href="/dashboard/profile" className="flex items-center gap-3 text-muted hover:text-text hover:bg-white/10 p-3 rounded-xl transition-colors font-semibold text-sm">👤 Profile</Link>
        <Link onClick={onNavigate} href="/dashboard/settings" className="flex items-center gap-3 text-muted hover:text-text hover:bg-white/10 p-3 rounded-xl transition-colors font-semibold text-sm">⚙️ Settings</Link>
        <p className="text-[11px] uppercase tracking-widest text-muted pt-4 mb-3">AI Modules</p>
        {appModules.map((m) => (
          <Link key={m.id} onClick={onNavigate} href={`/dashboard/${m.id}`} className="flex items-center gap-3 text-muted hover:text-text hover:bg-white/10 p-3 rounded-xl transition-colors font-semibold text-sm">
            <span>{m.icon}</span><span className="truncate">{m.short}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
