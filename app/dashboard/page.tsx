import { cookies } from 'next/headers'
import DashboardHomeClient from '@/components/dashboard/DashboardHomeClient'

export default async function DashboardPage() {
  const loggedIn = cookies().get('arcunos_logged_in')?.value === '1'
  const email = decodeURIComponent(cookies().get('arcunos_user_email')?.value || '')
  const userName = loggedIn ? decodeURIComponent(cookies().get('arcunos_user_name')?.value || email.split('@')[0] || 'User') : 'Guest Preview'
  return <DashboardHomeClient userName={userName} />
}
