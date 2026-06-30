import { useMemo, useState } from 'react';
import { Bell, ChevronRight, LogOut, Menu, Search, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import { modules, type ModuleItem } from './data/modules';
import { generateDemoResponse } from './lib/aiRouter';

type UserProfile = { name: string; email: string; plan: string };

const defaultUser: UserProfile = { name: 'raunak', email: 'demo@arcunos.ai', plan: 'Free Plan' };

function App() {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('arcunos:user');
    return saved ? JSON.parse(saved) as UserProfile : defaultUser;
  });
  const [selected, setSelected] = useState<ModuleItem>(modules[0]);
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const filtered = useMemo(() => modules.filter(m => `${m.title} ${m.description}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const runAgent = (item = selected) => {
    setSelected(item);
    setResponse(generateDemoResponse(item, input));
  };

  const saveProfile = () => {
    localStorage.setItem('arcunos:user', JSON.stringify(user));
    setShowProfile(false);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img src="/logo.jpg" alt="ArcUnos" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <div><h1>ArcUnos</h1><p>Intelligence · Automation · Impact</p></div>
        </div>
        <nav>
          <p className="nav-label">Main modules</p>
          {modules.slice(0, 12).map((m) => <button key={m.id} className={selected.id === m.id ? 'active' : ''} onClick={() => setSelected(m)}><m.icon size={17}/>{m.title}</button>)}
        </nav>
        <div className="security-card"><ShieldCheck size={18}/><span>Secure V3 foundation ready for real auth/API setup.</span></div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="search"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search modules, tools, tasks..." /></div>
          <button className="pill">{user.plan}</button>
          <button className="icon-btn"><Bell size={18}/><span>3</span></button>
          <button className="profile" onClick={() => setShowProfile(true)}><UserRound size={18}/>{user.name}</button>
        </header>

        <section className="hero">
          <div><h2>Good morning, <span>{user.name}</span>! 👋</h2><p>Choose a module and let ArcUnos prepare the workflow.</p></div>
          <Sparkles className="hero-icon" size={54}/>
        </section>

        <section className="module-grid">
          {filtered.map((m) => <button key={m.id} className="module-card" onClick={() => { setSelected(m); setInput(m.prompt); }}><m.icon size={24}/><h3>{m.title}</h3><p>{m.description}</p><span>{m.status === 'soon' ? 'Coming soon' : 'Open agent'} <ChevronRight size={14}/></span></button>)}
        </section>

        <section className="workspace">
          <div className="agent-panel">
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={selected.prompt} />
            <button className="primary" onClick={() => runAgent()}>Run ArcUnos Agent</button>
          </div>
          <div className="result-panel">
            <h2>Agent Output</h2>
            <pre>{response || 'Your result will appear here. V3 is deployment-safe and ready for backend API integration.'}</pre>
          </div>
        </section>
      </section>

      {showProfile && <div className="modal-backdrop"><div className="modal"><h2>Profile & App Settings</h2><label>Name<input value={user.name} onChange={(e)=>setUser({...user, name:e.target.value})}/></label><label>Email<input value={user.email} onChange={(e)=>setUser({...user, email:e.target.value})}/></label><button className="primary" onClick={saveProfile}>Save profile</button><button className="secondary" onClick={()=>setShowProfile(false)}><LogOut size={16}/>Close</button></div></div>}
    </main>
  );
}

export default App;
