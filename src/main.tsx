import React from 'react';
import { createRoot } from 'react-dom/client';
import { Bell, Bot, BriefcaseBusiness, Code2, FileText, Globe2, HeartPulse, Home, Image, LayoutDashboard, Search, Settings, Sparkles, UserRound, WalletCards } from 'lucide-react';
import './styles.css';

type Module = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  status: string;
};

const modules: Module[] = [
  { title: 'Website Analyzer', subtitle: 'Audit, speed, SEO, security', icon: <Globe2 />, status: 'Ready UI' },
  { title: 'SEO AI', subtitle: 'Keywords, reports, ranking plan', icon: <Search />, status: 'Planned AI' },
  { title: 'Student AI', subtitle: 'Notes, answers, study planner', icon: <Sparkles />, status: 'Ready UI' },
  { title: 'Resume Builder', subtitle: 'ATS resume and cover letter', icon: <FileText />, status: 'Next' },
  { title: 'Image Studio', subtitle: 'Generate and edit images', icon: <Image />, status: 'Next' },
  { title: 'Developer AI', subtitle: 'Code, debug, explain, deploy', icon: <Code2 />, status: 'Next' },
  { title: 'Business AI', subtitle: 'Plans, pitch, analytics, growth', icon: <BriefcaseBusiness />, status: 'Ready UI' },
  { title: 'Finance AI', subtitle: 'Budget, track, compare', icon: <WalletCards />, status: 'Ready UI' },
  { title: 'Health AI', subtitle: 'Fitness, diet, routine', icon: <HeartPulse />, status: 'Ready UI' }
];

const tasks = [
  'Analyze a website',
  'Generate resume',
  'Write email',
  'Create image',
  'Summarize PDF',
  'Fix code bug',
  'Plan my day',
  'Create business plan'
];

function App() {
  const savedName = localStorage.getItem('arcunos-user-name') || 'Raunak';

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-card">
          <div className="logo-mark">A</div>
          <div>
            <h1>ArcUnos</h1>
            <p>Intelligence · Automation · Impact</p>
          </div>
        </div>

        <nav className="nav-list">
          <a className="active"><Home /> Home</a>
          <a><LayoutDashboard /> Dashboard</a>
          <a><Bot /> AI Modules</a>
          <a><FileText /> Files</a>
          <a><Settings /> Settings</a>
        </nav>

        <section className="upgrade-card">
          <p className="eyebrow">V3 Foundation</p>
          <h2>Clean live base</h2>
          <p>Ready for V4 UI, profile, settings and V5 working AI tools.</p>
        </section>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div className="search-box">
            <Search />
            <span>What do you want ArcUnos to do today?</span>
          </div>
          <button className="pill">Free Plan</button>
          <button className="icon-button"><Bell /></button>
          <button className="profile-button"><UserRound /> {savedName}</button>
        </header>

        <section className="hero-card">
          <div>
            <p className="eyebrow">ArcUnos Version 3</p>
            <h2>Good evening, <span>{savedName}</span> 👋</h2>
            <p>ArcUnos is now rebuilt on a cleaner foundation. This version is prepared for real login, profile settings, AI tools, website audit and premium modules in the next releases.</p>
            <div className="hero-actions">
              <button>Start with AI Assistant</button>
              <button className="secondary">View roadmap</button>
            </div>
          </div>
          <div className="orb"><Sparkles /></div>
        </section>

        <section className="task-section">
          <div className="section-title">
            <div>
              <p className="eyebrow">Popular Tasks</p>
              <h3>Quick actions</h3>
            </div>
            <button className="link-button">View more →</button>
          </div>
          <div className="task-grid">
            {tasks.map(task => <button key={task}>{task}</button>)}
          </div>
        </section>

        <section className="module-section">
          <div className="section-title">
            <div>
              <p className="eyebrow">20+ AI Experts</p>
              <h3>Core modules prepared</h3>
            </div>
            <button className="link-button">Explore all →</button>
          </div>
          <div className="module-grid">
            {modules.map(module => (
              <article className="module-card" key={module.title}>
                <div className="module-icon">{module.icon}</div>
                <div>
                  <h4>{module.title}</h4>
                  <p>{module.subtitle}</p>
                </div>
                <span>{module.status}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="status-grid">
          <article>
            <h3>What changed in V3?</h3>
            <p>Cleaner dashboard, better module layout, V3 identity, deployment-ready foundation, and removed confusing demo-login wording.</p>
          </article>
          <article>
            <h3>Next version focus</h3>
            <p>V4 will add working profile edit, settings, notifications, login/auth pages, better theme controls and full module navigation.</p>
          </article>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
