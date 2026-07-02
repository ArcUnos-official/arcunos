import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '@/components/layout/LogoutButton'
import ThemeSwitcher from '@/components/layout/ThemeSwitcher'
import MobileSidebar from '@/components/layout/MobileSidebar'
import SidebarNav from '@/components/layout/SidebarNav'
import DashboardSearch from '@/components/layout/DashboardSearch'
import UserAvatar from '@/components/layout/UserAvatar'
import AmbientVideo from '@/components/layout/AmbientVideo'

function getCookieValue(name: string) {
  return cookies().get(name)?.value
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = getCookieValue('arcunos_logged_in') === '1'
  const guestPreview = getCookieValue('arcunos_guest_preview') === '1'
  const isGuest = !loggedIn
  const email = loggedIn ? decodeURIComponent(getCookieValue('arcunos_user_email') || '') : 'preview@arcunos.app'
  const userName = loggedIn ? decodeURIComponent(getCookieValue('arcunos_user_name') || email.split('@')[0] || 'User') : 'Guest Preview'
  const avatarUrl: string | null = null

  return (
    <div className="flex h-screen bg-bg overflow-hidden relative" data-guest={isGuest ? 'true' : 'false'}>
      <div className="grid-lines" />
      <div className="bg-orb" />
      <AmbientVideo />
      <aside className="w-72 border-r border-line bg-card/80 backdrop-blur-2xl p-5 flex-col h-full overflow-y-auto hidden md:flex z-10">
        <SidebarNav />
      </aside>

      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden z-10">
        <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-bg/85 backdrop-blur-xl border-b border-line gap-3">
          <MobileSidebar />
          <DashboardSearch />
          <div className="flex items-center gap-3 ml-auto">
            <ThemeSwitcher />
            <Link href="/dashboard/profile" className="hidden sm:flex items-center gap-2 ghost-btn px-3 py-2">
              <UserAvatar name={userName} avatarUrl={avatarUrl} email={email} />
              <span className="text-xs font-bold max-w-28 truncate">{userName}</span>
            </Link>
            <span className="hidden lg:inline-block px-3 py-2 rounded-xl border border-line bg-white/5 text-xs font-bold text-text">{guestPreview ? 'PREVIEW' : 'FREE PLAN'}</span>
            <LogoutButton userName={userName.split(' ')[0]} isGuest={isGuest} />
          </div>
        </header>
        {guestPreview && (
          <div className="z-20 border-b border-gold/30 bg-gold/10 px-4 py-2 text-sm text-text">
            Guest Preview: you can view features, but running AI tools, saving work, profile changes and memory require login.
            <Link href="/" className="ml-2 font-bold text-violet underline">Sign in / Create account</Link>
          </div>
        )}
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}
