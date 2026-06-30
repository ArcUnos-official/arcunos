import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Bell, Briefcase, Camera, CheckCircle2, Code2, CreditCard, Home, Image, KeyRound, LogOut, Mail, Menu, Moon, Phone, Search, Settings, Shield, Sparkles, Upload, User, Wand2, FileText, Globe2, Heart, House, GraduationCap, Github, Lock, Sun, X } from 'lucide-react';
import './styles.css';

type View = 'home' | 'dashboard' | 'modules' | 'files' | 'settings';
type AuthMode = 'login' | 'signup' | 'forgot';
type Theme = 'dark' | 'light';

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  avatar: string;
};

type ModuleItem = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  status: 'active' | 'soon';
};

const modules: ModuleItem[] = [
  { title: 'Household AI', subtitle: 'Bills, chores, shopping, home plans', icon: <House size={22} />, status: 'active' },
  { title: 'Website Analyzer', subtitle: 'Audit, SEO, speed, fixes', icon: <Globe2 size={22} />, status: 'active' },
  { title: 'Resume Builder', subtitle: 'ATS resume and cover letter', icon: <FileText size={22} />, status: 'active' },
  { title: 'Image Studio', subtitle: 'Generate and edit images', icon: <Image size={22} />, status: 'soon' },
  { title: 'Developer AI', subtitle: 'Code, debug, explain, deploy', icon: <Code2 size={22} />, status: 'active' },
  { title: 'Student AI', subtitle: 'Notes, answers, study planner', icon: <GraduationCap size={22} />, status: 'active' },
  { title: 'Business AI', subtitle: 'Plans, pitch, analytics, growth', icon: <Briefcase size={22} />, status: 'active' },
  { title: 'Health AI', subtitle: 'Fitness, diet, routine', icon: <Heart size={22} />, status: 'active' }
];

const defaultUser: UserProfile = {
  name: 'Raunak',
  email: 'raunak@example.com',
  phone: '',
  avatar: ''
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('arcunos-session') === 'active');
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('arcunos-profile');
    return saved ? JSON.parse(saved) : defaultUser;
  });
  const [view, setView] = useState<View>('home');
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeModule, setActiveModule] = useState<ModuleItem | null>(null);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('arcunos-theme') as Theme) || 'dark');
  const [toast, setToast] = useState('');

  const displayName = useMemo(() => profile.name?.trim() || 'ArcUnos User', [profile.name]);

  const saveProfile = (next: UserProfile) => {
    setProfile(next);
    localStorage.setItem('arcunos-profile', JSON.stringify(next));
  };

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };

  const login = (nextProfile: UserProfile) => {
    saveProfile(nextProfile);
    localStorage.setItem('arcunos-session', 'active');
    setIsLoggedIn(true);
    setView('home');
    notify('Welcome to ArcUnos');
  };

  const logout = () => {
    localStorage.removeItem('arcunos-session');
    setIsLoggedIn(false);
    setProfileOpen(false);
    notify('Logged out successfully');
  };

  const changeTheme = (next: Theme) => {
    setTheme(next);
    localStorage.setItem('arcunos-theme', next);
  };

  if (!isLoggedIn) {
    return <AuthScreen onLogin={login} />;
  }

  return (
    <div className={`app ${theme}`}>
      {toast && <div className="toast"><CheckCircle2 size={16} />{toast}</div>}
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">A</div>
          <div><strong>ArcUnos</strong><span>Intelligence · Automation · Impact</span></div>
        </div>
        <nav>
          <NavButton active={view === 'home'} onClick={() => setView('home')} icon={<Home size={18} />} label="Home" />
          <NavButton active={view === 'dashboard'} onClick={() => setView('dashboard')} icon={<Sparkles size={18} />} label="Dashboard" />
          <NavButton active={view === 'modules'} onClick={() => setView('modules')} icon={<Wand2 size={18} />} label="AI Modules" />
          <NavButton active={view === 'files'} onClick={() => setView('files')} icon={<FileText size={18} />} label="Files" />
          <NavButton active={view === 'settings'} onClick={() => setView('settings')} icon={<Settings size={18} />} label="Settings" />
        </nav>
        <div className="sidebar-card">
          <strong>V3.1 Rescue</strong>
          <p>Login, profile, settings, logout and navigation are restored.</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search"><Search size={18} /><input placeholder="What do you want ArcUnos to do today?" onFocus={() => notify('Universal search is ready for V4 AI routing')} /></div>
          <button className="pill" onClick={() => notify('You are currently on the Free Plan')}>Free Plan</button>
          <button className="icon-btn" onClick={() => notify('No new notifications')}><Bell size={18} /></button>
          <div className="profile-area">
            <button className="profile-button" onClick={() => setProfileOpen(!profileOpen)}>
              {profile.avatar ? <img src={profile.avatar} alt="Profile" /> : <User size={18} />}
              {displayName}
            </button>
            {profileOpen && (
              <div className="profile-menu">
                <button onClick={() => { setView('settings'); setProfileOpen(false); }}><Settings size={16} /> Account settings</button>
                <button onClick={() => { setView('settings'); setProfileOpen(false); notify('Security settings opened'); }}><Shield size={16} /> Security</button>
                <button onClick={logout}><LogOut size={16} /> Logout</button>
              </div>
            )}
          </div>
        </header>

        {view === 'home' && <HomeView name={displayName} openModule={setActiveModule} goModules={() => setView('modules')} />}
        {view === 'dashboard' && <DashboardView openModule={setActiveModule} />}
        {view === 'modules' && <ModulesView openModule={setActiveModule} />}
        {view === 'files' && <FilesView notify={notify} />}
        {view === 'settings' && <SettingsView profile={profile} saveProfile={saveProfile} theme={theme} setTheme={changeTheme} notify={notify} />}
      </main>

      {activeModule && <ModulePanel module={activeModule} onClose={() => setActiveModule(null)} notify={notify} />}
    </div>
  );
}

function AuthScreen({ onLogin }: { onLogin: (profile: UserProfile) => void }) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('Raunak');
  const [email, setEmail] = useState('raunak@example.com');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState('');

  const submit = () => {
    if (mode === 'forgot') {
      setMessage('Password reset instructions are ready to send when email service is connected.');
      return;
    }
    onLogin({ name: name || 'ArcUnos User', email: email || 'user@arcunos.ai', phone, avatar: '' });
  };

  const socialLogin = (provider: string) => {
    onLogin({ name: provider === 'Google' ? 'Raunak' : 'ArcUnos User', email: `${provider.toLowerCase()}@arcunos.ai`, phone, avatar: '' });
  };

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <div className="auth-logo">A</div>
        <h1>Welcome to ArcUnos</h1>
        <p>Your AI operating system for work, study, business, home and creation.</p>
        <div className="auth-points">
          <span><CheckCircle2 size={16} /> One workspace</span>
          <span><CheckCircle2 size={16} /> Personal profile</span>
          <span><CheckCircle2 size={16} /> AI modules ready</span>
        </div>
      </section>
      <section className="auth-card">
        <h2>{mode === 'signup' ? 'Create your account' : mode === 'forgot' ? 'Reset password' : 'Sign in to ArcUnos'}</h2>
        <p>Professional access for your ArcUnos workspace.</p>
        <div className="social-row">
          <button onClick={() => socialLogin('Google')}><Mail size={16} /> Google</button>
          <button onClick={() => socialLogin('GitHub')}><Github size={16} /> GitHub</button>
          <button onClick={() => setMessage('Apple login is prepared for later release.')}><Sparkles size={16} /> Apple</button>
        </div>
        {mode !== 'forgot' && <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />}
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="email" />
        {mode !== 'forgot' && <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number optional" />}
        {mode !== 'forgot' && <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />}
        {mode !== 'forgot' && <label className="remember"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me</label>}
        <button className="primary" onClick={submit}>{mode === 'forgot' ? 'Send reset link' : mode === 'signup' ? 'Create account' : 'Continue'}</button>
        <div className="auth-links">
          <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>{mode === 'signup' ? 'Already have account?' : 'Create account'}</button>
          <button onClick={() => setMode(mode === 'forgot' ? 'login' : 'forgot')}>{mode === 'forgot' ? 'Back to login' : 'Forgot password?'}</button>
        </div>
        {message && <div className="inline-message">{message}</div>}
      </section>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return <button className={`nav-btn ${active ? 'active' : ''}`} onClick={onClick}>{icon}<span>{label}</span></button>;
}

function HomeView({ name, openModule, goModules }: { name: string; openModule: (m: ModuleItem) => void; goModules: () => void }) {
  return (
    <section className="content">
      <div className="hero-card">
        <div>
          <span className="eyebrow">ArcUnos V3.1</span>
          <h1>Good evening, {name} <span className="wave">👋</span></h1>
          <p>Professional login, profile, settings and navigation are restored. Start any workspace below.</p>
          <div className="hero-actions"><button onClick={goModules}>Explore AI modules</button><button onClick={() => openModule(modules[0])}>Open Household AI</button></div>
        </div>
        <div className="orb"><Sparkles size={42} /></div>
      </div>
      <QuickActions openModule={openModule} />
      <ModulesGrid openModule={openModule} limit={6} />
    </section>
  );
}

function DashboardView({ openModule }: { openModule: (m: ModuleItem) => void }) {
  return (
    <section className="content">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <Stat title="Active modules" value="8" />
        <Stat title="Workspace status" value="Ready" />
        <Stat title="Profile" value="Editable" />
      </div>
      <QuickActions openModule={openModule} />
    </section>
  );
}

function ModulesView({ openModule }: { openModule: (m: ModuleItem) => void }) {
  return <section className="content"><h2>AI Modules</h2><ModulesGrid openModule={openModule} /></section>;
}

function FilesView({ notify }: { notify: (m: string) => void }) {
  return (
    <section className="content">
      <h2>Files</h2>
      <div className="panel-card">
        <Upload size={26} />
        <h3>Upload center</h3>
        <p>File upload UI is ready. Real storage will connect in the AI backend phase.</p>
        <button onClick={() => notify('File picker UI will connect to storage in V5')}>Choose file</button>
      </div>
    </section>
  );
}

function SettingsView({ profile, saveProfile, theme, setTheme, notify }: { profile: UserProfile; saveProfile: (p: UserProfile) => void; theme: Theme; setTheme: (t: Theme) => void; notify: (m: string) => void }) {
  const update = (key: keyof UserProfile, value: string) => saveProfile({ ...profile, [key]: value });
  const uploadAvatar = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => saveProfile({ ...profile, avatar: String(reader.result) });
    reader.readAsDataURL(file);
  };
  return (
    <section className="content">
      <h2>Settings</h2>
      <div className="settings-grid">
        <div className="panel-card">
          <h3><User size={18} /> Account settings</h3>
          <div className="avatar-upload">
            <div className="avatar-preview">{profile.avatar ? <img src={profile.avatar} alt="Profile" /> : <Camera size={28} />}</div>
            <label><Upload size={16} /> Change profile picture<input type="file" accept="image/*" onChange={(e) => uploadAvatar(e.target.files?.[0])} /></label>
          </div>
          <input value={profile.name} onChange={(e) => update('name', e.target.value)} placeholder="Name" />
          <input value={profile.email} onChange={(e) => update('email', e.target.value)} placeholder="Email" />
          <input value={profile.phone} onChange={(e) => update('phone', e.target.value)} placeholder="Phone" />
          <button onClick={() => notify('Profile saved')}>Save profile</button>
        </div>
        <div className="panel-card">
          <h3><Shield size={18} /> Security settings</h3>
          <p>Password, device sessions and two-step security are prepared for backend authentication.</p>
          <button onClick={() => notify('Password flow prepared') }><KeyRound size={16} /> Change password</button>
        </div>
        <div className="panel-card">
          <h3><Sparkles size={18} /> Theme settings</h3>
          <div className="theme-row">
            <button className={theme === 'dark' ? 'selected' : ''} onClick={() => setTheme('dark')}><Moon size={16} /> Dark</button>
            <button className={theme === 'light' ? 'selected' : ''} onClick={() => setTheme('light')}><Sun size={16} /> Light</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickActions({ openModule }: { openModule: (m: ModuleItem) => void }) {
  const actions = ['Analyze a website', 'Generate resume', 'Write email', 'Create image', 'Fix code bug', 'Plan my household'];
  return <div className="quick"><h3>Quick actions</h3><div className="quick-grid">{actions.map((a, i) => <button key={a} onClick={() => openModule(modules[i % modules.length])}>{a}</button>)}</div></div>;
}

function ModulesGrid({ openModule, limit }: { openModule: (m: ModuleItem) => void; limit?: number }) {
  return <div className="module-grid">{modules.slice(0, limit || modules.length).map((m) => <button key={m.title} className="module-card" onClick={() => openModule(m)}><div className="module-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.subtitle}</p><span>{m.status === 'active' ? 'Open tool' : 'Prepared'}</span></button>)}</div>;
}

function ModulePanel({ module, onClose, notify }: { module: ModuleItem; onClose: () => void; notify: (m: string) => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}><X size={18} /></button>
        <div className="module-icon large">{module.icon}</div>
        <h2>{module.title}</h2>
        <p>{module.subtitle}</p>
        <textarea placeholder={`Tell ${module.title} what you need...`} />
        <button className="primary" onClick={() => notify(`${module.title} workspace opened. Real AI API will connect next.`)}>Run workspace</button>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return <div className="stat"><span>{title}</span><strong>{value}</strong></div>;
}

createRoot(document.getElementById('root')!).render(<App />);
