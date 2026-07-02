import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'
  const response = NextResponse.redirect(new URL(next, request.url))

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
          },
        },
      }
    )
    const { data } = await supabase.auth.exchangeCodeForSession(code)
    const user = data?.user
    if (user) {
      const email = user.email || ''
      const userName = user.user_metadata?.full_name || user.user_metadata?.name || email.split('@')[0] || 'User'
      const maxAge = 60 * 60 * 24 * 30
      response.cookies.set('arcunos_logged_in', '1', { path: '/', maxAge, sameSite: 'lax' })
      response.cookies.set('arcunos_user_email', email, { path: '/', maxAge, sameSite: 'lax' })
      response.cookies.set('arcunos_user_name', userName, { path: '/', maxAge, sameSite: 'lax' })
      response.cookies.delete('arcunos_guest_preview')
    }
  }

  return response
}
