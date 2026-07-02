'use client'
import { createBrowserClient } from '@supabase/ssr'
import { LogOut } from 'lucide-react'

function hasSupabaseKeys() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  return Boolean(url && key && !url.includes('demo.supabase.co') && key !== 'demo-key')
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
}

function clearKnownCookies() {
  ;[
    'arcunos_logged_in',
    'arcunos_guest_preview',
    'arcunos_user_email',
    'arcunos_user_name',
  ].forEach(clearCookie)

  // Clean common Supabase auth cookie leftovers without touching unrelated browser data.
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim()
    if (name && (name.includes('supabase') || name.startsWith('sb-'))) clearCookie(name)
  })
}

export default function LogoutButton({ userName, isGuest = false }: { userName: string; isGuest?: boolean }) {
  const handleLogout = async () => {
    try {
      if (!isGuest && hasSupabaseKeys()) {
        const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
        await supabase.auth.signOut()
      }
    } catch {}

    try {
      localStorage.removeItem('arcunos_logged_in')
      localStorage.removeItem('arcunos_guest_preview')
      localStorage.removeItem('arcunos_user_email')
      localStorage.removeItem('arcunos_user_name')
      sessionStorage.clear()
      clearKnownCookies()
    } catch {}

    window.location.replace('/')
  }

  return (
    <button onClick={handleLogout} className="ghost-btn px-3 py-2 text-xs font-bold text-red flex items-center gap-2 shrink-0">
      <LogOut size={14} /> <span className="hidden sm:inline">{isGuest ? 'Exit Preview' : `Logout ${userName}`}</span>
    </button>
  )
}
