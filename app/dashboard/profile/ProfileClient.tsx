'use client'

import { useEffect, useState } from 'react'
import UserAvatar from '@/components/layout/UserAvatar'

type Props = {
  initialName: string
  initialEmail: string
  initialAvatarUrl: string | null
  isGuest: boolean
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
}

export default function ProfileClient({ initialName, initialEmail, initialAvatarUrl, isGuest }: Props) {
  const [name, setName] = useState(initialName)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!initialAvatarUrl && typeof window !== 'undefined') {
      const saved = localStorage.getItem(`arcunos.avatar.${initialEmail}`)
      if (saved) setAvatarUrl(saved)
    }
  }, [initialAvatarUrl, initialEmail])

  const saveProfile = async () => {
    setMessage('')
    if (isGuest) {
      setMessage('Login is required to update profile and DP.')
      return
    }
    localStorage.setItem('arcunos_user_name', name)
    setCookie('arcunos_user_name', name)
    if (avatarUrl) {
      localStorage.setItem(`arcunos.avatar.${initialEmail}`, avatarUrl)
      localStorage.setItem('arcunos_user_dp', avatarUrl)
    }
    window.dispatchEvent(new Event('arcunos-profile-updated'))
    setMessage('Profile saved. DP and name updated.')
  }

  const onAvatarFile = (file?: File) => {
    if (!file) return
    if (isGuest) {
      setMessage('Login is required to change DP.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result)
      setAvatarUrl(result)
      localStorage.setItem(`arcunos.avatar.${initialEmail}`, result)
      localStorage.setItem('arcunos_user_dp', result)
      window.dispatchEvent(new Event('arcunos-profile-updated'))
      setMessage('DP selected. Click Save Profile to apply it locally.')
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <section className="glass-card p-6 flex flex-col md:flex-row gap-6 md:items-center">
        <UserAvatar name={name} avatarUrl={avatarUrl} size={72} />
        <div className="flex-1">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-muted">{initialEmail}</p>
          <p className="text-sm text-muted mt-2">{isGuest ? 'Guest preview only. Login to save profile, DP, history and memory.' : 'Your ArcUnos account session is active.'}</p>
        </div>
        <span className="px-4 py-2 rounded-xl border border-green/30 bg-green/10 text-green font-bold text-xs">{isGuest ? 'PREVIEW' : 'FREE PLAN'}</span>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="soft-card p-5 space-y-3">
          <b>Display Name</b>
          <input className="input-shell" value={name} onChange={(e) => setName(e.target.value)} disabled={isGuest} />
          <p className="text-sm text-muted">Change the name shown in the dashboard and profile.</p>
        </div>
        <div className="soft-card p-5 space-y-3">
          <b>Profile Picture / DP</b>
          <input type="file" accept="image/*" onChange={(e) => onAvatarFile(e.target.files?.[0])} disabled={isGuest} className="block w-full text-sm text-muted" />
          <p className="text-sm text-muted">Choose a local DP for ArcUnos.</p>
        </div>
        <div className="soft-card p-5"><b>Saved Work</b><p className="text-sm text-muted mt-1">Recent tools and outputs save locally in V3; cloud memory can be added in V4.</p></div>
        <div className="soft-card p-5"><b>Account Security</b><p className="text-sm text-muted mt-1">Logout clears the ArcUnos session and browser auth state.</p></div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button onClick={saveProfile} className="primary-btn px-5 py-3 disabled:opacity-50" disabled={isGuest}>Save Profile</button>
        {message && <p className="text-sm text-muted self-center">{message}</p>}
      </div>
    </>
  )
}
