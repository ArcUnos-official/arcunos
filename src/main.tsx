import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Home, Brain, LayoutDashboard, FolderKanban, Files, History, Bookmark, Settings,
  Crown, Bell, Search, User, ChevronDown, Upload, LogOut, Shield, Palette, Mail,
  Phone, Github, KeyRound, Eye, Camera, Globe2, Star, Code2, Briefcase, Handshake,
  Paintbrush, Video, GraduationCap, Puzzle, ShoppingBag, Wallet, HeartPulse, Scale,
  Plane, Landmark, FileText, Image, Presentation, Languages, Mic, PenTool, Table2,
  Bot, NotebookTabs, Users, CalendarDays, Lock, CheckCircle2, Sparkles, Zap
} from 'lucide-react';
import './styles.css';

type Module = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  plan: 'Free' | 'Pro';
  category: string;
  tools: string[];
  details: string;
};

const modules: Module[] = [
  { id: 'website', title: 'Website Analyzer', subtitle: 'Audit, SEO, speed, fixes', icon: Globe2, plan: 'Free', category: 'Website', tools: ['Run website audit', 'Performance score', 'Security checks', 'AI fix suggestions'], details: 'Analyze websites for SEO, performance, accessibility, mobile readiness, security basics and improvement suggestions.' },
  { id: 'seo', title: 'SEO AI', subtitle: 'Keywords, reports, ranking plan', icon: Brain, plan: 'Free', category: 'Growth', tools: ['Keyword planner', 'On-page SEO', 'Meta generator', 'Ranking checklist'], details: 'Plan keywords, improve metadata, build SEO reports and generate content improvement suggestions.' },
  { id: 'student', title: 'Student AI', subtitle: 'Study, notes, exams', icon: GraduationCap, plan: 'Free', category: 'Education', tools: ['Study planner', 'Notes maker', 'Quiz generator', 'Assignment helper'], details: 'Make study plans, notes, exam questions, quick revision sheets and assignment outlines.' },
  { id: 'teacher', title: 'Teacher AI', subtitle: 'Teach, test, evaluate', icon: GraduationCap, plan: 'Pro', category: 'Education', tools: ['Question paper', 'Lesson plan', 'Rubric maker', 'Answer evaluation'], details: 'Create lesson plans, question papers, assessments, rubrics and classroom materials.' },
  { id: 'developer', title: 'Developer AI', subtitle: 'Code, debug, explain, deploy', icon: Code2, plan: 'Free', category: 'Development', tools: ['Explain code', 'Find bugs', 'Generate component', 'Deployment checklist'], details: 'Debug code, explain functions, generate UI components, plan architecture and deployment steps.' },
  { id: 'business', title: 'Business AI', subtitle: 'Plan, analyze, grow', icon: Briefcase, plan: 'Free', category: 'Business', tools: ['Business plan', 'Pitch deck outline', 'SWOT analysis', 'Revenue ideas'], details: 'Create business plans, market analysis, pitch outlines, SWOT and growth ideas.' },
  { id: 'sales', title: 'Sales AI', subtitle: 'Leads, CRM, close deals', icon: Handshake, plan: 'Pro', category: 'Business', tools: ['Lead script', 'Follow-up email', 'Deal notes', 'CRM summary'], details: 'Generate sales scripts, follow-ups, deal summaries and customer conversation notes.' },
  { id: 'designer', title: 'Designer AI', subtitle: 'UI, UX, branding', icon: Paintbrush, plan: 'Pro', category: 'Creative', tools: ['Logo ideas', 'Color palette', 'Landing layout', 'UX checklist'], details: 'Create branding systems, page layouts, UI ideas, UX flows and design direction.' },
  { id: 'creator', title: 'Creator AI', subtitle: 'Content, video, social media', icon: Video, plan: 'Free', category: 'Creative', tools: ['Video script', 'Caption ideas', 'Content calendar', 'Hook generator'], details: 'Generate social media content, scripts, hooks, captions and creator calendars.' },
  { id: 'household', title: 'Household AI', subtitle: 'Bills, chores, shopping, home plans', icon: Home, plan: 'Free', category: 'Life', tools: ['Chore planner', 'Meal planner', 'Budget list', 'Shopping list'], details: 'Plan home routines, chores, groceries, meals, bills, repairs and weekly household tasks.' },
  { id: 'shopping', title: 'Shopping AI', subtitle: 'Compare, find, save', icon: ShoppingBag, plan: 'Free', category: 'Shopping', tools: ['Product compare', 'Price checklist', 'Buying guide', 'Deal notes'], details: 'Compare products, build buying guides, shortlist options and create decision summaries.' },
  { id: 'finance', title: 'Finance AI', subtitle: 'Budget, track, invest', icon: Wallet, plan: 'Pro', category: 'Finance', tools: ['Budget planner', 'Expense summary', 'Savings plan', 'Investment notes'], details: 'Create personal budgets, expense summaries, saving goals and finance planning notes.' },
  { id: 'health', title: 'Health AI', subtitle: 'Fitness, diet, routine', icon: HeartPulse, plan: 'Free', category: 'Health', tools: ['Workout plan', 'Meal routine', 'Habit tracker', 'Wellness checklist'], details: 'Plan fitness routines, diet schedules, habits and general wellness checklists.' },
  { id: 'legal', title: 'Legal AI', subtitle: 'Documents, terms, legal help', icon: Scale, plan: 'Pro', category: 'Documents', tools: ['Contract summary', 'Terms outline', 'Legal checklist', 'Notice draft'], details: 'Summarize documents, draft simple notices, create checklists and explain legal wording.' },
  { id: 'travel', title: 'Travel AI', subtitle: 'Trips, itinerary, explore', icon: Plane, plan: 'Free', category: 'Travel', tools: ['Trip plan', 'Budget trip', 'Packing list', 'Day itinerary'], details: 'Plan trips, routes, packing lists, budgets and daily itineraries.' },
  { id: 'government', title: 'Government AI', subtitle: 'Services, schemes, forms', icon: Landmark, plan: 'Pro', category: 'Public', tools: ['Scheme finder', 'Form checklist', 'Document list', 'Application draft'], details: 'Organize government service information, forms, document checklists and application steps.' },
  { id: 'resume', title: 'Resume Builder', subtitle: 'ATS resume and cover letter', icon: FileText, plan: 'Free', category: 'Career', tools: ['ATS resume', 'Cover letter', 'Skills section', 'Profile summary'], details: 'Build professional resumes, ATS-friendly skills, cover letters and profile summaries.' },
  { id: 'image', title: 'Image Studio', subtitle: 'Generate and edit images', icon: Image, plan: 'Pro', category: 'Creative', tools: ['Prompt builder', 'Image brief', 'Style guide', 'Creative direction'], details: 'Create image prompts, design briefs, style references and image editing instructions.' },
  { id: 'pdf', title: 'PDF Tools', subtitle: 'Summarize and analyze PDF', icon: Files, plan: 'Free', category: 'Files', tools: ['PDF summary', 'Extract points', 'Ask document', 'Study notes'], details: 'Summarize PDFs, extract key points, convert text into notes and prepare questions.' },
  { id: 'presentation', title: 'Presentation AI', subtitle: 'Create PPT structure', icon: Presentation, plan: 'Pro', category: 'Office', tools: ['Slide outline', 'Pitch deck', 'Class presentation', 'Design notes'], details: 'Generate presentation outlines, pitch deck structure and slide-by-slide content.' },
  { id: 'document', title: 'Document AI', subtitle: 'Write, edit, summarize', icon: NotebookTabs, plan: 'Free', category: 'Office', tools: ['Doc summary', 'Rewrite', 'Formal tone', 'Action points'], details: 'Draft, rewrite, summarize and improve documents in different tones.' },
  { id: 'translator', title: 'Translator AI', subtitle: 'Translate any language', icon: Languages, plan: 'Free', category: 'Language', tools: ['Translate text', 'Simplify language', 'Formal rewrite', 'Local tone'], details: 'Translate and rewrite text with clearer tone, local meaning and professional language.' },
  { id: 'voice', title: 'Voice AI', subtitle: 'Voice notes and scripts', icon: Mic, plan: 'Pro', category: 'Audio', tools: ['Voice script', 'Call summary', 'Podcast notes', 'Speech draft'], details: 'Prepare speech scripts, call notes, podcast summaries and voice assistant workflows.' },
  { id: 'writer', title: 'AI Writer', subtitle: 'Blogs, emails, articles', icon: PenTool, plan: 'Free', category: 'Writing', tools: ['Write email', 'Blog outline', 'Article draft', 'Ad copy'], details: 'Write emails, blogs, articles, ad copy and formal communication.' },
  { id: 'excel', title: 'Excel AI', subtitle: 'Sheets, formulas, reports', icon: Table2, plan: 'Pro', category: 'Office', tools: ['Formula helper', 'Report table', 'Data summary', 'Dashboard plan'], details: 'Plan spreadsheets, formulas, reports, dashboards and data summaries.' },
  { id: 'research', title: 'Research AI', subtitle: 'Search, compare, explain', icon: Search, plan: 'Pro', category: 'Research', tools: ['Research brief', 'Compare sources', 'Explain topic', 'Fact checklist'], details: 'Create research briefs, topic explanations, comparison notes and structured findings.' },
  { id: 'marketing', title: 'Marketing AI', subtitle: 'Campaigns, ads, growth', icon: Zap, plan: 'Pro', category: 'Growth', tools: ['Campaign plan', 'Ad copy', 'Landing copy', 'Audience ideas'], details: 'Plan campaigns, landing pages, ad copies and audience strategies.' },
  { id: 'social', title: 'Social Media AI', subtitle: 'Posts, reels, captions', icon: Star, plan: 'Free', category: 'Creative', tools: ['Instagram caption', 'Reel script', 'LinkedIn post', 'Content calendar'], details: 'Generate social posts, reels, captions, hashtags and content calendars.' },
  { id: 'hr', title: 'HR AI', subtitle: 'Hiring, JD, interview', icon: Users, plan: 'Pro', category: 'Business', tools: ['Job description', 'Interview questions', 'Offer draft', 'HR policy'], details: 'Write job descriptions, interview questions, HR drafts and policy outlines.' },
  { id: 'planner', title: 'Planner AI', subtitle: 'Daily planning and goals', icon: CalendarDays, plan: 'Free', category: 'Life', tools: ['Plan my day', 'Goal breakdown', 'Reminder plan', 'Priority matrix'], details: 'Plan days, goals, routines, priorities and productivity systems.' }
];

const quickActions = [
  ['Analyze a website', 'website'], ['Help with my assignment', 'student'], ['Compare product prices', 'shopping'], ['Create presentation', 'presentation'],
  ['Improve my resume', 'resume'], ['Plan my day', 'planner'], ['Write email', 'writer'], ['Generate image', 'image']
];

function savedUser() {
  try { return JSON.parse(localStorage.getItem('arcunosUser') || 'null'); } catch { return null; }
}

function App() {
  const [user, setUser] = useState<any>(savedUser());
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | 'phone'>('login');
  const [name, setName] = useState(savedUser()?.name || 'Raunak Mishra');
  const [email, setEmail] = useState(savedUser()?.email || '');
  const [phone, setPhone] = useState(savedUser()?.phone || '');
  const [remember, setRemember] = useState(true);
  const [activePage, setActivePage] = useState('home');
  const [activeModule, setActiveModule] = useState<Module>(modules[0]);
  const [menu, setMenu] = useState(false);
  const [plan, setPlan] = useState<'Free' | 'Pro'>(user?.plan || 'Free');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [toast, setToast] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('arcunosTheme') || 'phoenix');

  const proCount = useMemo(() => modules.filter(m => m.plan === 'Pro').length, []);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  }

  function login(provider?: string) {
    const profile = { name: name || 'Raunak Mishra', email: email || `${provider || 'user'}@arcunos.ai`, phone, plan, avatar };
    localStorage.setItem('arcunosUser', JSON.stringify(profile));
    setUser(profile);
    setActivePage('home');
    notify(provider ? `${provider} login ready. Real OAuth connects in backend.` : 'Logged in successfully.');
  }

  function logout() {
    localStorage.removeItem('arcunosUser');
    setUser(null);
    setMenu(false);
    setActivePage('home');
  }

  function openModule(moduleId: string) {
    const mod = modules.find(m => m.id === moduleId) || modules[0];
    setActiveModule(mod);
    setActivePage('module');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function onAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const nextAvatar = String(reader.result);
      setAvatar(nextAvatar);
      const nextUser = { ...(user || {}), name, email, phone, plan, avatar: nextAvatar };
      setUser(nextUser);
      localStorage.setItem('arcunosUser', JSON.stringify(nextUser));
      notify('Profile photo updated.');
    };
    reader.readAsDataURL(file);
  }

  if (!user) {
    return <main className={`auth theme-${theme}`}>
      <div className="aurora"></div>
      <section className="auth-card glass">
        <div className="brand-row"><div className="logo-mark">A</div><div><h1>ArcUnos</h1><p>AI Operating System</p></div></div>
        <h2>{authMode === 'signup' ? 'Create your account' : authMode === 'forgot' ? 'Recover password' : authMode === 'phone' ? 'Login with phone' : 'Welcome back'}</h2>
        <p className="muted">One intelligent workspace for study, business, coding, creativity, finance and daily life.</p>
        {authMode === 'phone' ? <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" /> : authMode === 'forgot' ? <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" /> : <>
          {authMode === 'signup' && <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />}
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
          <input type="password" placeholder="Password" />
          {authMode === 'signup' && <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" />}
        </>}
        <div className="auth-row"><label><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me</label><button onClick={() => setAuthMode('forgot')}>Forgot password?</button></div>
        <button className="primary" onClick={() => authMode === 'forgot' ? notify('Password reset email screen ready. Backend email connects in V4.') : login() }>{authMode === 'signup' ? 'Create account' : authMode === 'forgot' ? 'Send recovery email' : 'Continue'}</button>
        <div className="divider"><span>or continue with</span></div>
        <div className="provider-grid">
          <button onClick={() => login('Google')}><Mail size={16}/> Google</button>
          <button onClick={() => login('GitHub')}><Github size={16}/> GitHub</button>
          <button onClick={() => notify('Apple login UI ready. Backend OAuth connects later.')}> Apple</button>
        </div>
        <div className="auth-row bottom"><button onClick={() => setAuthMode(authMode === 'signup' ? 'login' : 'signup')}>{authMode === 'signup' ? 'Already have account?' : 'Create account'}</button><button onClick={() => setAuthMode('phone')}><Phone size={14}/> Phone login</button></div>
      </section>
      {toast && <div className="toast">{toast}</div>}
    </main>;
  }

  return <div className={`app theme-${theme}`}>
    <div className="jarvis-orb"></div>
    <aside className="sidebar">
      <div className="brand-row"><div className="logo-mark">A</div><div><h1>ArcUnos</h1><p>AI Operating System</p></div></div>
      {[['home','Home',Home],['brain','ArcUnos Brain',Brain],['dashboard','Dashboard',LayoutDashboard],['projects','Projects',FolderKanban],['files','Files',Files],['history','History',History],['bookmarks','Bookmarks',Bookmark]].map(([id,label,Icon]: any) => <button key={id} onClick={() => setActivePage(id)} className={activePage === id ? 'active nav' : 'nav'}><Icon size={18}/>{label}</button>)}
      <div className="side-title">Workspaces</div>
      {['My Workspace','Study Workspace','Business Workspace','Dev Workspace'].map((x, i) => <button key={x} className="workspace" onClick={() => { setActivePage('dashboard'); notify(`${x} opened`); }}><span>{['💼','📚','📊','💻'][i]}</span>{x}</button>)}
      <div className="upgrade"><Crown size={18}/><b>ArcUnos Pro</b><p>Unlock Pro AI workspaces and advanced tools.</p><button onClick={() => { setPlan('Pro'); notify('Pro preview enabled.'); }}>Upgrade Now</button></div>
    </aside>

    <main className="content">
      <header className="topbar"><div className="search"><Search size={18}/><input placeholder="What do you want to accomplish today?" onKeyDown={e => { if (e.key === 'Enter') openModule('writer'); }} /></div><button className="pill" onClick={() => setPlan(plan === 'Free' ? 'Pro' : 'Free')}><Crown size={15}/>{plan} Plan</button><button className="icon-btn" onClick={() => notify('Notifications opened')}><Bell size={18}/></button><div className="profile" onClick={() => setMenu(!menu)}>{avatar ? <img src={avatar}/> : <User size={18}/>}<span>{user.name || name}</span><ChevronDown size={16}/>{menu && <div className="profile-menu"><button onClick={() => setActivePage('profile')}><User size={16}/> Profile</button><button onClick={() => setActivePage('settings')}><Settings size={16}/> Settings</button><button onClick={() => setActivePage('security')}><Shield size={16}/> Security</button><button onClick={logout}><LogOut size={16}/> Logout</button></div>}</div></header>
      {activePage === 'home' && <HomePage openModule={openModule} setPage={setActivePage} proCount={proCount} />}
      {activePage === 'module' && <ModulePage module={activeModule} notify={notify} />}
      {activePage === 'dashboard' && <DashboardPage openModule={openModule} />}
      {activePage === 'brain' && <SimplePage title="ArcUnos Brain" subtitle="Central assistant for routing your work to the right AI expert." icon={Bot} actions={['Ask ArcUnos', 'Plan workflow', 'Summarize activity']} />}
      {activePage === 'projects' && <SimplePage title="Projects" subtitle="Organize tasks, AI outputs, files and workspace history." icon={FolderKanban} actions={['New project', 'Project timeline', 'Export summary']} />}
      {activePage === 'files' && <SimplePage title="Files" subtitle="Upload and organize documents, images, PDFs, spreadsheets and presentations." icon={Files} actions={['Upload file', 'Create folder', 'Open gallery']} />}
      {activePage === 'history' && <SimplePage title="History" subtitle="Your recent AI activities and generated work will appear here." icon={History} actions={['View recent', 'Clear history', 'Export log']} />}
      {activePage === 'bookmarks' && <SimplePage title="Bookmarks" subtitle="Save important modules, tasks and AI outputs for quick access." icon={Bookmark} actions={['Add bookmark', 'Pinned tools', 'Saved notes']} />}
      {activePage === 'profile' && <ProfilePage name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} avatar={avatar} onAvatar={onAvatar} notify={notify} />}
      {activePage === 'settings' && <SettingsPage theme={theme} setTheme={setTheme} notify={notify} />}
      {activePage === 'security' && <SimplePage title="Security" subtitle="Manage account protection, password, sessions and login methods." icon={Lock} actions={['Change password', 'Login methods', 'Active sessions']} />}
    </main>
    <aside className="assistant-panel">
      <div className="assistant-card glass"><div className="assistant-head"><div className="logo-mark small">A</div><div><b>ArcUnos AI Assistant</b><p className="online">● Online</p></div></div><p>Hi {user.name?.split(' ')[0] || 'Raunak'}! Choose any task and I will open the correct AI workspace.</p><div className="mini-actions">{quickActions.map(([label,id]) => <button key={id} onClick={() => openModule(id)}>{label}</button>)}</div></div>
      <div className="assistant-card upload"><b>You can also upload</b><div className="upload-types"><span>Image</span><span>PDF</span><span>Doc</span><span>Excel</span><span>PPT</span><span>More</span></div></div>
      <div className="assistant-card"><b>ArcUnos Status</b><p><CheckCircle2 size={15}/> All systems ready</p><p>{modules.length}+ AI experts available</p></div>
    </aside>
    {toast && <div className="toast">{toast}</div>}
  </div>;
}

function HomePage({ openModule, setPage, proCount }: any) {
  return <>
    <section className="hero glass"><div><p className="eyebrow">Your AI Operating System</p><h2>Good evening, Raunak! 👋</h2><p>Choose an expert below. Every card opens its matching ArcUnos workspace.</p><button onClick={() => openModule('website')}>Start with Website Analyzer</button><button className="ghost" onClick={() => setPage('dashboard')}>Open dashboard</button></div><Sparkles size={80}/></section>
    <section className="quick glass"><h3>What do you want to do today?</h3><div className="quick-grid">{modules.slice(0,16).map(m => <button className="quick-card" key={m.id} onClick={() => openModule(m.id)}><m.icon size={24}/><b>{m.title.replace(' AI','')}</b><span>{m.subtitle}</span></button>)}</div></section>
    <section className="recommended"><h3>Recommended for you</h3><div className="recommend-row">{['seo','student','shopping','resume'].map(id => { const m = modules.find(x => x.id === id)!; return <button key={id} onClick={() => openModule(id)}><m.icon/><span>{m.title}</span><small>{m.subtitle}</small></button>; })}</div></section>
    <section><h3>All Modules ({modules.length}+ AI Experts in One Place)</h3><div className="module-grid">{modules.map(m => <ModuleCard key={m.id} module={m} openModule={openModule} />)}</div></section>
    <section className="value-row"><div>Zero Prompting<br/><span>Just select what you want to do</span></div><div>All-in-One<br/><span>Every AI expert in one place</span></div><div>Smart & Fast<br/><span>Best results in seconds</span></div><div>Secure & Private<br/><span>Your data stays with you</span></div><div>Pro Experts<br/><span>{proCount} advanced workspaces</span></div></section>
  </>;
}

function ModuleCard({ module, openModule }: any) {
  const Icon = module.icon;
  return <button className="module-card" onClick={() => openModule(module.id)}><div className="module-icon"><Icon size={22}/></div><div className="plan-tag">{module.plan}</div><h4>{module.title}</h4><p>{module.subtitle}</p><span>Open {module.title}</span></button>;
}

function ModulePage({ module, notify }: { module: Module; notify: (s: string) => void }) {
  const Icon = module.icon;
  return <section className="workspace-page"><div className="workspace-hero glass"><Icon size={38}/><div><p className="eyebrow">{module.category} Workspace</p><h2>{module.title}</h2><p>{module.details}</p></div><span className="plan-badge">{module.plan} Plan</span></div><div className="workspace-layout"><div className="tool-panel glass"><h3>{module.title} Tools</h3>{module.tools.map(t => <button key={t} onClick={() => notify(`${t} opened in ${module.title}`)}><CheckCircle2 size={16}/>{t}</button>)}</div><div className="workbench glass"><h3>{module.title} Workbench</h3><input placeholder={`Enter task for ${module.title}`} /><textarea placeholder={`Describe what you want ${module.title} to do...`}></textarea><button className="primary" onClick={() => notify(`${module.title} generated a draft result.`)}>Generate with {module.title}</button><div className="result-box"><b>Result preview</b><p>This panel is dedicated to {module.title}. It will connect to real backend/API in the backend phase.</p></div></div></div></section>;
}

function DashboardPage({ openModule }: any) {
  return <section><div className="hero glass"><h2>Dashboard</h2><p>Your active modules, projects and quick actions.</p></div><div className="module-grid">{modules.slice(0,12).map(m => <ModuleCard key={m.id} module={m} openModule={openModule} />)}</div></section>;
}

function SimplePage({ title, subtitle, icon: Icon, actions }: any) {
  return <section className="workspace-page"><div className="workspace-hero glass"><Icon size={38}/><div><h2>{title}</h2><p>{subtitle}</p></div></div><div className="tool-panel glass">{actions.map((a: string) => <button key={a}><CheckCircle2 size={16}/>{a}</button>)}</div></section>;
}

function ProfilePage({ name, setName, email, setEmail, phone, setPhone, avatar, onAvatar, notify }: any) {
  return <section className="settings-page glass"><h2>Profile</h2><div className="avatar-box">{avatar ? <img src={avatar}/> : <User size={42}/>}<label><Camera size={16}/> Change photo<input type="file" accept="image/*" onChange={onAvatar}/></label></div><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"/><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone"/><button className="primary" onClick={() => notify('Profile saved locally.')}>Save profile</button></section>;
}

function SettingsPage({ theme, setTheme, notify }: any) {
  return <section className="settings-page glass"><h2>Settings</h2><p>Customize ArcUnos theme, account preferences and workspace behavior.</p><div className="setting-row"><Palette/>Theme<select value={theme} onChange={e => { setTheme(e.target.value); localStorage.setItem('arcunosTheme', e.target.value); }}><option value="phoenix">Phoenix Purple</option><option value="arcunos">ArcUnos Blue</option><option value="midnight">Midnight</option></select></div><div className="setting-row"><Bell/>Notifications<input type="checkbox" defaultChecked /></div><div className="setting-row"><Shield/>Privacy Mode<input type="checkbox" defaultChecked /></div><button className="primary" onClick={() => notify('Settings saved.')}>Save settings</button></section>;
}

createRoot(document.getElementById('root')!).render(<App />);
