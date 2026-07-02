import ThemeSwitcher from '@/components/layout/ThemeSwitcher'
import BackHomeButtons from '@/components/layout/BackHomeButtons'

export default function SettingsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-xs text-muted">Dashboard / Settings</p>
          <h2 className="text-3xl font-bold mt-1">Settings</h2>
          <p className="text-muted mt-1">Real AI-app style controls for interface, account, privacy and saved work.</p>
        </div>
        <BackHomeButtons />
      </div>

      <section className="glass-card p-6 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <b>Interface Theme</b>
            <p className="text-sm text-muted">Switch between Premium Light, Dark, Black-Gold and Purple. Video tint adapts with the selected theme.</p>
          </div>
          <ThemeSwitcher />
        </div>
        <div className="border-t border-line pt-5 flex items-center justify-between gap-4">
          <div>
            <b>Plan</b>
            <p className="text-sm text-muted">Modules stay free. Only advanced tools are marked PRO for future pricing.</p>
          </div>
          <span className="px-4 py-2 rounded-xl border border-green/30 bg-green/10 text-green font-bold text-xs">FREE</span>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="soft-card p-5"><b>Profile & DP</b><p className="text-sm text-muted mt-1">Manage display name, avatar and account identity from Profile.</p></div>
        <div className="soft-card p-5"><b>Saved Memory</b><p className="text-sm text-muted mt-1">V3 demo keeps workspace state locally; V4 will save uploads, outputs and history in Supabase.</p></div>
        <div className="soft-card p-5"><b>Search</b><p className="text-sm text-muted mt-1">Global search finds modules and tools, then opens the right workspace.</p></div>
        <div className="soft-card p-5"><b>Navigation</b><p className="text-sm text-muted mt-1">Back and Home buttons are available on Profile, Settings and every module page.</p></div>
        <div className="soft-card p-5"><b>Privacy & Security</b><p className="text-sm text-muted mt-1">Real login, session control and Google account security will be connected in V4.</p></div>
        <div className="soft-card p-5"><b>Advanced API Keys</b><p className="text-sm text-muted mt-1">Hidden advanced area for OpenAI, Gemini and other AI providers will be added when you provide keys.</p></div>
      </section>
    </div>
  )
}
