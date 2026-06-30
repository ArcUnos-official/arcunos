import { useMemo, useState } from 'react';
import { Check, Lock, LogOut, Mail, Rocket, Search, Shield, Sparkles, UserRound } from 'lucide-react';
import { modules, type ArcModule, type ModuleKey } from './data/modules';
import { hasSupabase, supabase } from './lib/supabase';
import { runArcAI } from './lib/aiRouter';

type User = { name: string; email: string; plan: 'free' | 'pro' };
type View = 'landing' | 'login' | 'signup' | 'dashboard';

const demoUserKey = 'arcunos_user_v3';

function App() {
  const [view, setView] = useState<View>(() => localStorage.getItem(demoUserKey) ? 'dashboard' : 'landing');
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(demoUserKey);
    return raw ? JSON.parse(raw) : null;
  });
  const [selected, setSelected] = useState<ModuleKey>('assistant');
  const selectedModule = useMemo(() => modules.find(m => m.key === selected) || modules[0], [selected]);

  const finishLocalAuth = (name: string, email: string) => {
    const next = { name: name || email.split('@')[0], email, plan: 'free' as const };
    localStorage.setItem(demoUserKey, JSON.stringify(next));
    setUser(next);
    setView('dashboard');
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    localStorage.removeItem(demoUserKey);
    setUser(null);
    setView('landing');
  };

  if (view === 'landing') return <Landing onLogin={() => setView('login')} onSignup={() => setView('signup')} />;
  if (view === 'login') return <Auth mode="login" onBack={() => setView('landing')} onSwitch={() => setView('signup')} onDone={finishLocalAuth} />;
  if (view === 'signup') return <Auth mode="signup" onBack={() => setView('landing')} onSwitch={() => setView('login')} onDone={finishLocalAuth} />;
  return <Dashboard user={user!} selected={selectedModule} onSelect={setSelected} onLogout={logout} />;
}

function Brand() {
  return <div className="brand"><img src="/logo.jpg" alt="ArcUnos logo" /><div><b>ArcUnos</b><span>AI Operating System</span></div></div>;
}

function Landing({ onLogin, onSignup }: { onLogin: () => void; onSignup: () => void }) {
  return <main className="page landing">
    <nav className="topbar"><Brand /><div className="nav-actions"><button onClick={onLogin} className="ghost">Login</button><button onClick={onSignup} className="primary">Start Free</button></div></nav>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow"><Sparkles size={16}/> One Platform. Every AI. Zero Prompting.</p>
        <h1>Build, study, code, design, grow and automate with one intelligent workspace.</h1>
        <p className="lead">ArcUnos v3 is the professional foundation: real auth-ready flow, modular AI workspaces, Free/Pro structure, and an AI router prepared for backend APIs.</p>
        <div className="hero-buttons"><button onClick={onSignup} className="primary big">Create account</button><button onClick={onLogin} className="secondary big">I already have access</button></div>
      </div>
      <div className="hero-card glass"><div className="orb"/><h3>Arc Router</h3><p>One request enters ArcUnos, then the best AI workspace handles it automatically.</p><div className="mini-grid">{['Website', 'Student', 'Code', 'Business', 'Design', 'SEO'].map(x => <span key={x}>{x}</span>)}</div></div>
    </section>
  </main>;
}

function Auth({ mode, onBack, onSwitch, onDone }: { mode: 'login' | 'signup'; onBack: () => void; onSwitch: () => void; onDone: (name: string, email: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submit = async () => {
    if (!email || !password) return setMessage('Enter email and password.');
    if (hasSupabase && supabase) {
      const result = mode === 'signup'
        ? await supabase.auth.signUp({ email, password, options: { data: { name } } })
        : await supabase.auth.signInWithPassword({ email, password });
      if (result.error) return setMessage(result.error.message);
      setMessage(mode === 'signup' ? 'Verification email sent. Check inbox.' : 'Login successful.');
      onDone(name, email);
      return;
    }
    setMessage('Demo session created. Add Supabase keys to enable real verification emails.');
    onDone(name, email);
  };

  const oauth = async (provider: 'google' | 'facebook') => {
    if (hasSupabase && supabase) {
      await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin } });
    } else setMessage(`${provider} login needs Supabase OAuth setup. UI is ready; keys are missing.`);
  };

  return <main className="page auth-page"><button onClick={onBack} className="back">← Back</button><div className="auth-card glass"><Brand />
    <h1>{mode === 'signup' ? 'Create your ArcUnos account' : 'Login to ArcUnos'}</h1>
    <p>{mode === 'signup' ? 'Start with Free. Upgrade to Pro when you need advanced AI.' : 'Continue your AI workspace.'}</p>
    {mode === 'signup' && <label>Full name<input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" /></label>}
    <label>Email<input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></label>
    <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimum 8 characters" /></label>
    <button onClick={submit} className="primary full">{mode === 'signup' ? 'Sign up with email' : 'Login with email'}</button>
    <div className="divider">or continue with</div>
    <div className="oauth"><button onClick={() => oauth('google')}>Google</button><button onClick={() => oauth('facebook')}>Facebook</button></div>
    {message && <p className="notice">{message}</p>}
    <p className="switch">{mode === 'signup' ? 'Already have an account?' : 'New to ArcUnos?'} <button onClick={onSwitch}>{mode === 'signup' ? 'Login' : 'Create account'}</button></p>
  </div></main>;
}

function Dashboard({ user, selected, onSelect, onLogout }: { user: User; selected: ArcModule; onSelect: (k: ModuleKey) => void; onLogout: () => void }) {
  return <main className="app-shell">
    <aside className="sidebar"><Brand /><div className="search"><Search size={16}/><input placeholder="Search workspaces" /></div><nav>{modules.map(m => <button key={m.key} onClick={() => onSelect(m.key)} className={selected.key === m.key ? 'active' : ''}><m.icon size={18}/>{m.title}</button>)}</nav></aside>
    <section className="workspace">
      <header className="dash-head"><div><p className="eyebrow">Welcome back</p><h1>{user.name}</h1><p>Choose a workspace. ArcUnos will route your task to the right AI engine.</p></div><div className="profile-pill"><UserRound size={18}/><span>{user.plan.toUpperCase()}</span><button onClick={onLogout}><LogOut size={16}/></button></div></header>
      <section className="stats"><Card icon={<Rocket/>} title="15+ Workspaces" text="All current ArcUnos modules preserved."/><Card icon={<Shield/>} title="Auth Ready" text="Supabase verification and OAuth supported."/><Card icon={<Mail/>} title="Free / Pro" text="Plan locks and upgrade flow structured."/></section>
      <AIWorkspace module={selected} plan={user.plan}/>
      <section className="module-grid">{modules.map(m => <ModuleCard key={m.key} module={m} onClick={() => onSelect(m.key)} active={selected.key === m.key}/>)}</section>
    </section>
  </main>;
}

function Card({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="stat-card glass"><span>{icon}</span><h3>{title}</h3><p>{text}</p></div>; }

function ModuleCard({ module, active, onClick }: { module: ArcModule; active: boolean; onClick: () => void }) {
  return <button className={`module-card glass ${active ? 'active-card' : ''}`} onClick={onClick}><module.icon/><h3>{module.title}</h3><p>{module.subtitle}</p></button>;
}

function AIWorkspace({ module, plan }: { module: ArcModule; plan: 'free' | 'pro' }) {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true); setOutput('');
    try { setOutput(await runArcAI({ module: module.key, prompt, plan })); }
    catch (err) { setOutput(err instanceof Error ? err.message : 'Something went wrong.'); }
    finally { setLoading(false); }
  };

  return <section className="ai-panel glass"><div className="ai-title"><div><p className="eyebrow">Selected workspace</p><h2><module.icon/> {module.title}</h2><p>{module.subtitle}</p></div><button className="pro-btn">Upgrade Pro</button></div>
    <div className="features"><div><h4>Free</h4>{module.free.map(x => <p key={x}><Check size={14}/> {x}</p>)}</div><div><h4>Pro</h4>{module.pro.map(x => <p key={x}><Lock size={14}/> {x}</p>)}</div></div>
    <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={`Ask ${module.title} anything...`} />
    <button onClick={run} className="primary" disabled={loading}>{loading ? 'Thinking...' : 'Run ArcUnos AI'}</button>
    {output && <pre className="output">{output}</pre>}
  </section>;
}

export default App;
