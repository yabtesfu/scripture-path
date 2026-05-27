import { BookOpen, CalendarDays, Flame, Play } from 'lucide-react';
import { dashboard } from '../data/dashboard.js';

function ProgressRing({ value }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="h-24 w-24">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(236,228,210,0.18)" strokeWidth="5" />
      <circle
        cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="5"
        strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
        className="-rotate-90 origin-center text-gold"
        style={{ transformOrigin: '50% 50%' }}
      />
    </svg>
  );
}

function StreakGrid() {
  return (
    <div className="mt-7 grid grid-cols-7 gap-2 sm:grid-cols-14">
      {dashboard.weeklyPattern.map((isDone, i) => (
        <span
          key={i}
          className={`aspect-square border ${isDone ? 'border-gold bg-gold/80' : 'border-paper/15 bg-paper/5'} ${
            i === dashboard.weeklyPattern.length - 1 ? 'ring-1 ring-paper/60 ring-offset-1 ring-offset-ink' : ''
          }`}
        />
      ))}
    </div>
  );
}

export default function Dashboard() {
  const progress = Math.round((dashboard.completedReadings / dashboard.totalReadings) * 100);

  return (
    <>
      {/* ── Meta bar ── */}
      <section className="grid border-b border-paper/15 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60 md:grid-cols-3">
        <span>{dashboard.dateLabel}</span>
        <span className="hidden text-center font-serif text-sm italic normal-case tracking-normal md:block">
          A quiet road through the text.
        </span>
        <span className="text-left md:text-right">
          Day {dashboard.day} of {dashboard.totalDays}
        </span>
      </section>

      {/* ── Hero ── */}
      <section className="grid min-h-[540px] border-b border-paper/15 lg:grid-cols-[1.04fr_0.96fr]">
        {/* Passage */}
        <div className="bg-paper px-5 py-10 text-ink sm:px-9 lg:border-r lg:border-ink/20">
          <div className="mb-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-14 bg-gold" />
            Today&apos;s Reading
          </div>
          <h1 className="max-w-3xl font-serif text-[56px] italic leading-[0.88] tracking-normal text-ink sm:text-[80px] xl:text-[108px]">
            Walk the <span className="text-gold">mountain</span> path.
          </h1>
          <div className="my-8 flex justify-between border-y border-ink/25 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.26em]">
            <span>{dashboard.passageRef}</span>
            <span className="font-mono font-normal opacity-65">ESV</span>
          </div>
          <p className="max-w-2xl font-serif text-2xl leading-relaxed text-ink">
            <span className="float-left pr-4 pt-3 font-serif text-[120px] font-semibold leading-[0.72] text-gold">
              {dashboard.passage[0]}
            </span>
            {dashboard.passage.slice(1)}
          </p>
        </div>

        {/* Plan progress */}
        <div className="relative overflow-hidden bg-ink2 p-7 sm:p-10">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(135deg,transparent_0_32%,rgba(198,142,79,0.22)_32%_33%,transparent_33%_66%,rgba(236,228,210,0.1)_66%_67%,transparent_67%)] bg-[length:90px_90px]" />
          <div className="relative flex h-full min-h-[380px] flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-goldBright">Current Plan</div>
              <h2 className="mt-5 max-w-md font-serif text-5xl italic leading-none text-paper sm:text-6xl">
                {dashboard.planName}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-end">
              <div className="text-gold">
                <ProgressRing value={progress} />
              </div>
              <div>
                <div className="font-serif text-6xl leading-none text-paper">
                  {progress}<small className="font-mono text-lg text-paper/55">%</small>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-paper/15 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/65">
                  <span>{dashboard.completedReadings} read</span>
                  <span>{dashboard.totalReadings - dashboard.completedReadings} remain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Streak / Up Next / Reflection ── */}
      <section className="grid border-b border-paper/15 lg:grid-cols-[1.18fr_0.92fr_0.92fr]">
        <article className="border-b border-paper/15 p-7 lg:border-b-0 lg:border-r lg:border-paper/10">
          <div className="section-label">
            <Flame size={14} />
            Streak
          </div>
          <div className="mt-5 flex items-start gap-2 font-serif text-[100px] font-semibold leading-[0.84] text-paper">
            {dashboard.streak}
            <sup className="mt-4 font-mono text-2xl font-normal text-gold">days</sup>
          </div>
          <StreakGrid />
        </article>

        <article className="border-b border-paper/15 p-7 lg:border-b-0 lg:border-r lg:border-paper/10">
          <div className="section-label">
            <BookOpen size={14} />
            Up Next
          </div>
          <h3 className="mt-5 font-serif text-4xl italic leading-none">{dashboard.nextReading.title}</h3>
          <div className="mt-5 flex justify-between border-t border-paper/15 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/65">
            <span>{dashboard.nextReading.reference}</span>
            <span>{dashboard.nextReading.estimate}</span>
          </div>
          <button className="mt-8 inline-flex items-center gap-3 border border-gold px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-ink">
            <Play size={13} fill="currentColor" />
            Begin
          </button>
        </article>

        <article className="bg-gold p-7 text-ink">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/70">
            <CalendarDays size={14} />
            Reflection
            <span className="h-px flex-1 bg-ink/30" />
          </div>
          <blockquote className="mt-5 font-serif text-3xl italic leading-tight text-ink">
            {dashboard.reflectionPrompt}
          </blockquote>
        </article>
      </section>

      {/* ── Notes ── */}
      <section className="grid border-b border-paper/15 md:grid-cols-3">
        {dashboard.notes.map((note, i) => (
          <div key={i} className="flex gap-4 border-b border-paper/10 p-6 md:border-b-0 md:border-r last:md:border-r-0">
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">0{i + 1}</span>
            <p className="font-serif text-xl italic leading-snug text-paper/80">{note}</p>
          </div>
        ))}
      </section>

      {/* ── Footer ── */}
      <footer className="flex flex-wrap items-center justify-between gap-4 py-7 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
        <span>Scripture Path</span>
        <span>Day {dashboard.day} &mdash; {dashboard.planName}</span>
      </footer>
    </>
  );
}
