import { cookies } from 'next/headers'
import BackHomeButtons from '@/components/layout/BackHomeButtons'
import ProfileClient from './ProfileClient'

export default async function ProfilePage() {
  const loggedIn = cookies().get('arcunos_logged_in')?.value === '1'
  const email = loggedIn ? decodeURIComponent(cookies().get('arcunos_user_email')?.value || '') : 'preview@arcunos.app'
  const userName = loggedIn ? decodeURIComponent(cookies().get('arcunos_user_name')?.value || email.split('@')[0] || 'User') : 'Guest Preview'
  const avatarUrl: string | null = null

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-xs text-muted">Dashboard / Profile</p>
          <h2 className="text-3xl font-bold mt-1">Profile</h2>
          <p className="text-muted mt-1">Your account identity, avatar, DP and saved workspace profile.</p>
        </div>
        <BackHomeButtons />
      </div>
      <ProfileClient initialName={userName} initialEmail={email} initialAvatarUrl={avatarUrl} isGuest={!loggedIn} />
    </div>
  )
}
