import { useState } from 'react';
import { Flame, ScrollText } from 'lucide-react';
import Dashboard from './components/Dashboard.jsx';
import Plans from './components/Plans.jsx';
import Library from './components/Library.jsx';
import Journal from './components/Journal.jsx';
import Study from './components/Study.jsx';
import { dashboard } from './data/dashboard.js';

const TABS = [
  { id: 'dashboard', label: 'Today',   num: 'I.'   },
  { id: 'plans',     label: 'Plans',   num: 'II.'  },
  { id: 'library',   label: 'Library', num: 'III.' },
  { id: 'study',     label: 'Study',   num: 'IV.'  },
  { id: 'journal',   label: 'Journal', num: 'V.'   },
];

function Wordmark() {
  return (
    <a href="#" className="flex items-center gap-3 text-paper no-underline">
      <span className="grid h-10 w-10 place-items-center border border-gold/50 text-gold">
        <ScrollText size={20} strokeWidth={1.8} />
      </span>
      <span className="font-serif text-3xl italic leading-none text-paper">
        Scripture <b className="not-italic text-gold">Path</b>
      </span>
    </a>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dateStr = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

  return (
    <div className="min-h-screen bg-ink text-paper">
      {/* Fixed ambiance layers */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(198,142,79,0.14),transparent_38%),radial-gradient(circle_at_50%_110%,rgba(0,0,0,0.5),transparent_46%)]" />
      <div className="noise pointer-events-none fixed inset-0 z-50 opacity-[0.18] mix-blend-overlay" />

      <div className="relative z-20 mx-auto max-w-[1440px] px-5 sm:px-8 xl:px-14">

        {/* ── Masthead ── */}
        <header className="grid items-center gap-5 border-b border-paper/15 py-5 md:grid-cols-[1fr_auto_1fr]">
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-paper/55 md:flex md:gap-6">
            <span>A daily reading.</span>
          </div>
          <Wordmark />
          <div className="flex items-center justify-start md:justify-end">
            <div className="inline-flex cursor-default items-center gap-3 border border-paper/40 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition hover:border-gold hover:bg-gold hover:text-ink">
              <Flame size={14} className="text-goldBright" />
              Streak&nbsp;<b className="text-goldBright">{dashboard.streak}</b>&nbsp;days
            </div>
          </div>
        </header>

        {/* ── Tab nav ── */}
        <nav className="flex items-stretch justify-between border-b border-paper/15">
          <div className="flex">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-r border-paper/10 px-7 py-[18px] font-sans text-xs font-semibold uppercase tracking-[0.22em] transition ${
                  activeTab === tab.id
                    ? 'bg-paper text-ink'
                    : 'text-paper hover:bg-ink3'
                }`}
              >
                <span className={`mr-2.5 font-mono text-[10px] font-normal ${activeTab === tab.id ? 'text-ember' : 'opacity-50'}`}>
                  {tab.num}
                </span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="hidden items-center px-6 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/55 sm:flex">
            {dateStr}
          </div>
        </nav>

        {/* ── Active screen ── */}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'plans'     && <Plans onTabChange={setActiveTab} />}
        {activeTab === 'library'   && <Library onTabChange={setActiveTab} />}
        {activeTab === 'study'     && <Study />}
        {activeTab === 'journal'   && <Journal />}

      </div>
    </div>
  );
}
