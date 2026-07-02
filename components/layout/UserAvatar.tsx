'use client'

import { useEffect, useState } from 'react'

export default function UserAvatar({ name = 'User', avatarUrl, size = 40, email }: { name?: string; avatarUrl?: string | null; size?: number; email?: string }) {
  const [clientAvatar, setClientAvatar] = useState<string | null>(avatarUrl || null)
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'U'

  useEffect(() => {
    const loadAvatar = () => {
      const globalDp = localStorage.getItem('arcunos_user_dp')
      const emailDp = email ? localStorage.getItem(`arcunos.avatar.${email}`) : null
      setClientAvatar(globalDp || emailDp || avatarUrl || null)
    }
    loadAvatar()
    window.addEventListener('arcunos-profile-updated', loadAvatar)
    window.addEventListener('storage', loadAvatar)
    return () => {
      window.removeEventListener('arcunos-profile-updated', loadAvatar)
      window.removeEventListener('storage', loadAvatar)
    }
  }, [avatarUrl, email])

  return (
    <div style={{ width: size, height: size }} className="rounded-full border border-line bg-violet/15 flex items-center justify-center overflow-hidden font-bold text-violet shrink-0">
      {clientAvatar ? <img src={clientAvatar} alt={name} className="w-full h-full object-cover" /> : initials}
    </div>
  )
}
