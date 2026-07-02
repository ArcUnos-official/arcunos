'use client'

import { useEffect, useMemo, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import {
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  FileText,
  Globe2,
  GraduationCap,
  Image as ImageIcon,
  Menu,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react'
import ArcUnosEngine from '@/components/layout/ArcUnosEngine'

type AuthMode = 'signin' | 'signup' | 'forgot'

function hasSupabaseKeys() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  return Boolean(url && key && !url.includes('demo.supabase.co') && key !== 'demo-key')
}

function setArcunosSession(email: string, name?: string) {
  const safeEmail = email.trim().toLowerCase()
  const safeName = (name || safeEmail.split('@')[0] || 'User').trim()
  const maxAge = 60 * 60 * 24 * 30

  localStorage.setItem('arcunos_logged_in', '1')
  localStorage.setItem('arcunos_user_email', safeEmail)
  localStorage.setItem('arcunos_user_name', safeName)
  localStorage.removeItem('arcunos_guest_preview')

  document.cookie = `arcunos_logged_in=1; path=/; max-age=${maxAge}; SameSite=Lax`
  document.cookie = `arcunos_user_email=${encodeURIComponent(safeEmail)}; path=/; max-age=${maxAge}; SameSite=Lax`
  document.cookie = `arcunos_user_name=${encodeURIComponent(safeName)}; path=/; max-age=${maxAge}; SameSite=Lax`
  document.cookie = 'arcunos_guest_preview=; path=/; max-age=0; SameSite=Lax'
}

function setGuestPreview() {
  localStorage.removeItem('arcunos_logged_in')
  localStorage.setItem('arcunos_guest_preview', '1')
  document.cookie = 'arcunos_guest_preview=1; path=/; max-age=86400; SameSite=Lax'
  document.cookie = 'arcunos_logged_in=; path=/; max-age=0; SameSite=Lax'
}

const orbitNodes = [
  { label: 'Website AI', className: 'arc-orbit-node--website', Icon: Globe2 },
  { label: 'Business AI', className: 'arc-orbit-node--business', Icon: BriefcaseBusiness },
  { label: 'Student AI', className: 'arc-orbit-node--student', Icon: GraduationCap },
  { label: 'Developer AI', className: 'arc-orbit-node--developer', Icon: Code2 },
  { label: 'Image AI', className: 'arc-orbit-node--image', Icon: ImageIcon },
  { label: 'Resume AI', className: 'arc-orbit-node--resume', Icon: FileText },
]

const featureCards = [
  { title: 'All-in-One AI Suite', description: 'Access 30+ AI tools in one unified platform.', Icon: Zap },
  { title: 'Secure & Private', description: 'Enterprise-grade protection for your data and privacy.', Icon: ShieldCheck },
  { title: 'Blazing Fast', description: 'Optimized performance for real-world results.', Icon: Rocket },
  { title: 'Smart & Powerful', description: 'Advanced AI models working together.', Icon: BrainCircuit },
  { title: 'For Everyone', description: 'Students, developers, businesses and professionals.', Icon: Users },
]

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [authOpen, setAuthOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const configured = hasSupabaseKeys()

  const supabase = useMemo(() => {
    if (!configured) return null
    return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  }, [configured])

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-purple')
    document.body.classList.add('theme-gold')
    const loggedIn = localStorage.getItem('arcunos_logged_in') === '1'
    if (loggedIn) window.location.replace('/dashboard')
  }, [])

  useEffect(() => {
    if (!authOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAuthOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [authOpen])

  const openAuth = (nextMode: AuthMode) => {
    setMode(nextMode)
    setMessage('')
    setMobileNavOpen(false)
    setAuthOpen(true)
  }

  const handleEmailAuth = async (event: React.FormEvent) => {
    event.preventDefault()
    setMessage('')

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail) return setMessage('Enter your email.')
    if (mode !== 'forgot' && password.length < 6) return setMessage('Password must be at least 6 characters.')

    setLoading(true)
    try {
      if (mode === 'signin' || mode === 'signup') {
        setArcunosSession(cleanEmail, name || cleanEmail.split('@')[0])
        window.location.replace('/dashboard')
        return
      }

      if (mode === 'forgot') {
        if (supabase) {
          await supabase.auth.resetPasswordForEmail(cleanEmail, {
            redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/profile`,
          })
        }
        setMessage('Password reset instructions sent if this email exists.')
        setLoading(false)
      }
    } catch (error: any) {
      setMessage(error?.message || 'Something went wrong. Try again.')
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setMessage('')
    if (!configured || !supabase) {
      setMessage('Google login needs Supabase Google provider enabled. Use email sign in for now.')
      return
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
    })
    if (error) setMessage(error.message)
  }

  const enterGuestPreview = () => {
    setGuestPreview()
    router.push('/dashboard')
  }

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div id="home" className="arc-landing-page">
      <div className="arc-landing-backdrop" aria-hidden="true">
        <ArcUnosEngine spectrum="gold" density="landing" />
        <div className="arc-landing-aurora" />
        <div className="arc-landing-grid" />
        <div className="arc-landing-vignette" />
      </div>

      <header className="arc-landing-header">
        <a href="#home" className="arc-brand" aria-label="ArcUnos home">
          <span className="arc-brand-mark"><span>A</span></span>
          <span className="arc-brand-name">ArcUnos</span>
        </a>

        <nav className="arc-desktop-nav" aria-label="Primary navigation">
          <a className="is-active" href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#tools">Tools</a>
          <a href="#pricing">Pricing</a>
          <a href="#resources">Resources</a>
        </nav>

        <div className="arc-header-actions">
          <button type="button" className="arc-signin-button" onClick={() => openAuth('signin')}>Sign In</button>
          <button type="button" className="arc-gold-button arc-header-start" onClick={() => openAuth('signup')}>Get Started</button>
          <button
            type="button"
            className="arc-mobile-menu-button"
            aria-label="Toggle navigation"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((current) => !current)}
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileNavOpen && (
          <nav className="arc-mobile-nav" aria-label="Mobile navigation">
            <a href="#home" onClick={() => setMobileNavOpen(false)}>Home</a>
            <a href="#features" onClick={() => setMobileNavOpen(false)}>Features</a>
            <a href="#tools" onClick={() => setMobileNavOpen(false)}>Tools</a>
            <a href="#pricing" onClick={() => setMobileNavOpen(false)}>Pricing</a>
            <a href="#resources" onClick={() => setMobileNavOpen(false)}>Resources</a>
            <button type="button" onClick={() => openAuth('signup')}>Get Started Free</button>
          </nav>
        )}
      </header>

      <main className="arc-landing-main">
        <section className="arc-hero-copy" aria-labelledby="arcunos-hero-title">
          <div className="arc-premium-badge">
            <span>Premium</span>
            <strong>AI OS</strong>
          </div>

          <h1 id="arcunos-hero-title" className="arc-hero-title">
            <span className="arc-hero-title-line">Orchestrating Every AI.</span>
            <span className="arc-hero-title-line arc-hero-title-accent">Into One Intelligence.</span>
          </h1>

          <p className="arc-hero-description">
            The world&apos;s most advanced AI operating system for professionals, students, developers and businesses.
          </p>

          <div className="arc-hero-actions">
            <button type="button" className="arc-gold-button arc-primary-cta" onClick={() => openAuth('signup')}>
              Get Started For Free <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="arc-outline-button" onClick={scrollToFeatures}>Explore Features</button>
          </div>
        </section>

        <section className="arc-orbit-stage" aria-label="ArcUnos AI orchestration animation">
          <div className="arc-orbit-halo arc-orbit-halo--outer" aria-hidden="true" />
          <div className="arc-orbit-halo arc-orbit-halo--middle" aria-hidden="true" />
          <div className="arc-orbit-halo arc-orbit-halo--inner" aria-hidden="true" />
          <div className="arc-orbit-scan" aria-hidden="true" />
          <div className="arc-orbit-pulse" aria-hidden="true" />

          <div className="arc-core-diamond" aria-hidden="true">
            <div className="arc-core-diamond-inner"><span>A</span></div>
          </div>

          {orbitNodes.map(({ label, className, Icon }) => (
            <div key={label} className={`arc-orbit-node ${className}`}>
              <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </section>
      </main>

      <section id="features" className="arc-feature-strip" aria-label="ArcUnos benefits">
        {featureCards.map(({ title, description, Icon }) => (
          <article key={title} className="arc-feature-card">
            <div className="arc-feature-card-title">
              <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
              <h2>{title}</h2>
            </div>
            <p>{description}</p>
          </article>
        ))}
      </section>

      <div id="tools" className="arc-anchor-target" aria-hidden="true" />
      <div id="pricing" className="arc-anchor-target" aria-hidden="true" />
      <div id="resources" className="arc-anchor-target" aria-hidden="true" />

      <footer className="arc-landing-footer">ArcUnos Operating System © 2026. All rights reserved.</footer>

      {authOpen && (
        <div className="arc-auth-overlay" role="presentation" onMouseDown={() => setAuthOpen(false)}>
          <section
            className="arc-auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="arc-auth-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button type="button" className="arc-auth-close" aria-label="Close authentication" onClick={() => setAuthOpen(false)}>
              <X size={20} />
            </button>

            <div className="arc-auth-brand">
              <div className="arc-auth-mark"><span>Ai</span></div>
              <strong>ArcUnos</strong>
              <span id="arc-auth-title">
                {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
              </span>
            </div>

            {mode !== 'forgot' && (
              <button type="button" onClick={handleGoogleAuth} className="arc-google-button">
                <span aria-hidden="true">G</span> Continue with Google
              </button>
            )}

            <div className="arc-auth-divider">
              <span>{mode === 'forgot' ? 'Password Reset' : 'Or Secure Login'}</span>
            </div>

            <form onSubmit={handleEmailAuth} className="arc-auth-form">
              {mode === 'signup' && (
                <label>
                  <span>Name</span>
                  <input value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder="Your name" autoComplete="name" />
                </label>
              )}

              <label>
                <span>Email</span>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="name@domain.com" autoComplete="email" required />
              </label>

              {mode !== 'forgot' && (
                <label>
                  <span>Password</span>
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="••••••••"
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    required
                  />
                </label>
              )}

              <button disabled={loading} type="submit" className="arc-auth-submit">
                {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
              </button>
            </form>

            {message && <p className="arc-auth-message" role="status">{message}</p>}

            <div className="arc-auth-switches">
              {mode === 'signin' && (
                <>
                  <button type="button" onClick={() => { setMode('signup'); setMessage('') }}>Create Account</button>
                  <button type="button" onClick={() => { setMode('forgot'); setMessage('') }}>Forgot Password</button>
                </>
              )}
              {mode !== 'signin' && <button type="button" onClick={() => { setMode('signin'); setMessage('') }}>Back to Sign In</button>}
            </div>

            <button type="button" onClick={enterGuestPreview} className="arc-guest-button">
              <Sparkles size={14} aria-hidden="true" /> Continue as Guest Preview only
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
