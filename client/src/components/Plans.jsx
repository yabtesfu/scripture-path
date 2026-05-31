import { useState } from 'react';
import { BookOpen, Calendar, Check, ChevronRight, X } from 'lucide-react';
import { useProgress } from '../hooks/useProgress.js';

const FILTERS = [
  { id: 'all',           label: 'All Plans'     },
  { id: 'old-testament', label: 'Old Testament' },
  { id: 'new-testament', label: 'New Testament' },
  { id: 'wisdom',        label: 'Wisdom'        },
  { id: 'short',         label: 'Short'         },
  { id: 'long',          label: 'Long'          },
];

const PLANS = [
  {
    id: 1,
    num: '01',
    cats: ['old-testament'],
    active: false,
    title: 'Through the Law',
    subtitle: 'Genesis to Deuteronomy',
    days: 90,
    readings: 90,
    desc: 'A deliberate walk through the Pentateuch — creation, covenant, exodus, and law — reading the foundation of all Scripture.',
    progress: 0,
    tags: ['Old Testament', '90 days'],
  },
  {
    id: 2,
    num: '02',
    cats: ['new-testament', 'short'],
    active: true,
    title: 'Sermon on the Mount',
    subtitle: 'Matthew 5–7',
    days: 40,
    readings: 40,
    desc: 'Forty days inside the most concentrated ethical teaching of Jesus — the Beatitudes, the Lord\'s Prayer, and the narrow gate.',
    progress: 45,
    tags: ['New Testament', '40 days', 'In Progress'],
  },
  {
    id: 3,
    num: '03',
    cats: ['wisdom', 'old-testament'],
    active: false,
    title: 'The Psalms',
    subtitle: 'All 150 Psalms',
    days: 30,
    readings: 150,
    desc: 'Five books of prayer and praise — lament, celebration, pilgrimage, and royal song — covering every register of the human soul before God.',
    progress: 0,
    tags: ['Wisdom', 'Old Testament', '30 days'],
  },
  {
    id: 4,
    num: '04',
    cats: ['old-testament', 'long'],
    active: false,
    title: 'Prophets & Kings',
    subtitle: 'Isaiah to Malachi',
    days: 120,
    readings: 120,
    desc: 'The major and minor prophets read together with their historical context — exile, return, and the long expectation of restoration.',
    progress: 0,
    tags: ['Old Testament', '120 days'],
  },
  {
    id: 5,
    num: '05',
    cats: ['new-testament', 'short'],
    active: false,
    title: 'Letters of Paul',
    subtitle: 'Romans to Philemon',
    days: 28,
    readings: 28,
    desc: 'Paul\'s thirteen letters read in canonical order — justification, sanctification, community, and mystery across house churches of the first century.',
    progress: 0,
    tags: ['New Testament', '28 days'],
  },
  {
    id: 6,
    num: '06',
    cats: ['wisdom', 'old-testament', 'long'],
    active: false,
    title: 'Wisdom Literature',
    subtitle: 'Job, Proverbs, Ecclesiastes, Song of Songs',
    days: 60,
    readings: 60,
    desc: 'The four wisdom books side by side — suffering, practical virtue, vanity, and love — letting them argue and harmonise together.',
    progress: 0,
    tags: ['Wisdom', 'Old Testament', '60 days'],
  },
];

function PlanCard({ plan, isVisible, onSelect }) {
  return (
    <article
      onClick={() => onSelect(plan)}
      className="group relative flex cursor-pointer flex-col justify-between border border-paper/10 bg-ink2 p-6 transition-all duration-300 hover:border-gold/40 hover:bg-ink3"
      style={{
        opacity: isVisible ? 1 : 0.08,
        pointerEvents: isVisible ? 'auto' : 'none',
        filter: isVisible ? 'none' : 'blur(1px)',
      }}
    >
      {plan.active && (
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-none border border-gold/50 bg-gold/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-goldBright">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-goldBright" style={{ animation: 'pulse 2s infinite' }} />
          In Progress
        </div>
      )}

      <div>
        <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{plan.num}</div>
        <h3 className="font-serif text-3xl italic leading-tight text-paper group-hover:text-goldBright transition-colors">
          {plan.title}
        </h3>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/45">
          {plan.subtitle}
        </p>
        <p className="mt-5 font-serif text-base leading-relaxed text-paper/65">
          {plan.desc}
        </p>
      </div>

      <div className="mt-8">
        {plan.active && plan.progress > 0 && (
          <div className="mb-5">
            <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-paper/55">
              <span>{plan.progress}% complete</span>
              <span>{Math.round(plan.readings * (plan.progress / 100))} / {plan.readings}</span>
            </div>
            <div className="h-px w-full bg-paper/10">
              <div className="h-px bg-gold transition-all" style={{ width: `${plan.progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-paper/10 pt-5">
          <div className="flex flex-wrap gap-2">
            {plan.tags.map(tag => (
              <span key={tag} className="border border-paper/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/50">
                {tag}
              </span>
            ))}
          </div>
          <ChevronRight size={16} className="shrink-0 text-paper/30 group-hover:text-gold transition-colors" />
        </div>
      </div>
    </article>
  );
}

function PlanModal({ plan, onClose, onStart }) {
  if (!plan) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Scrim */}
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative z-10 w-full max-w-2xl border border-paper/15 bg-ink2 p-8 sm:p-10">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 border border-paper/20 p-1.5 text-paper/50 transition hover:border-gold hover:text-gold"
        >
          <X size={16} />
        </button>

        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{plan.num}</div>
        <h2 className="mt-3 font-serif text-5xl italic leading-tight text-paper">{plan.title}</h2>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/45">{plan.subtitle}</p>

        <p className="mt-6 font-serif text-xl leading-relaxed text-paper/75">{plan.desc}</p>

        <div className="mt-8 grid grid-cols-3 gap-4 border-y border-paper/10 py-6">
          <div className="text-center">
            <div className="font-serif text-4xl text-paper">{plan.days}</div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/45">Days</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl text-paper">{plan.readings}</div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/45">Readings</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl text-paper">{Math.ceil(plan.days / 7)}</div>
            <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/45">Weeks</div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {plan.active ? (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-3 bg-gold px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ink transition hover:bg-goldBright"
            >
              <BookOpen size={14} />
              Continue Reading
            </button>
          ) : (
            <button
              onClick={() => { onStart(plan); onClose(); }}
              className="inline-flex items-center gap-3 bg-gold px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ink transition hover:bg-goldBright"
            >
              <Calendar size={14} />
              Begin This Plan
            </button>
          )}
          <button
            onClick={onClose}
            className="border border-paper/30 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/60 transition hover:border-paper/60 hover:text-paper"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Plans({ onTabChange }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { progress: liveProgress, completedCount, totalReadings } = useProgress();

  function isVisible(plan) {
    if (activeFilter === 'all') return true;
    return plan.cats.includes(activeFilter);
  }

  // Inject live progress into plan 2 (the active Sermon on the Mount plan)
  const plansWithLiveProgress = PLANS.map(p =>
    p.id === 2 ? { ...p, progress: liveProgress } : p
  );

  return (
    <>
      {/* ── Filter bar ── */}
      <section className="flex flex-wrap items-center gap-3 border-b border-paper/15 py-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40">Filter</span>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
              activeFilter === f.id
                ? 'border-gold bg-gold text-ink'
                : 'border-paper/20 text-paper/60 hover:border-paper/50 hover:text-paper'
            }`}
          >
            {f.label}
          </button>
        ))}
      </section>

      {/* ── Plans grid ── */}
      <section className="py-10">
        <div className="mb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/40">
            {activeFilter === 'all' ? `${PLANS.length} plans available` : `Filtered: ${FILTERS.find(f => f.id === activeFilter)?.label}`}
          </div>
          <h2 className="mt-3 font-serif text-5xl italic leading-none text-paper sm:text-6xl">
            Reading Plans
          </h2>
        </div>

        <div className="grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          {plansWithLiveProgress.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isVisible={isVisible(plan)}
              onSelect={setSelectedPlan}
            />
          ))}
        </div>
      </section>

      {/* ── Promo banner ── */}
      <section className="mb-10 flex flex-col items-start justify-between gap-4 border border-paper/10 bg-ink2 p-7 sm:flex-row sm:items-center">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">Currently Active</div>
          <p className="mt-2 font-serif text-2xl italic text-paper">
            Sermon on the Mount &mdash; Day {completedCount + 1} of {totalReadings} &mdash; {liveProgress}% complete
          </p>
        </div>
        <button
          onClick={() => onTabChange && onTabChange('dashboard')}
          className="inline-flex shrink-0 items-center gap-3 border border-gold px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-ink"
        >
          <Check size={13} />
          Go to Today
        </button>
      </section>

      {/* Plan detail modal */}
      {selectedPlan && (
        <PlanModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onStart={() => { setSelectedPlan(null); onTabChange?.('dashboard'); }}
        />
      )}
    </>
  );
}
