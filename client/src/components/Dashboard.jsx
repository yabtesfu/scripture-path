import { useState } from 'react';
import { BookOpen, CalendarDays, Check, Flame, Play, X } from 'lucide-react';
import { dashboard } from '../data/dashboard.js';
import { useProgress } from '../hooks/useProgress.js';

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
        className="text-gold"
        style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)', transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  );
}

function StreakGrid({ pattern }) {
  return (
    <div className="mt-7 grid grid-cols-7 gap-2">
      {pattern.map((isDone, i) => (
        <span
          key={i}
          className={`aspect-square border transition-colors ${
            isDone ? 'border-gold bg-gold/80' : 'border-paper/15 bg-paper/5'
          } ${i === pattern.length - 1 ? 'ring-1 ring-paper/60 ring-offset-1 ring-offset-ink' : ''}`}
        />
      ))}
    </div>
  );
}

function ReadingModal({ reading, isDone, onComplete, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl border border-paper/15 bg-paper text-ink">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-ink/15 p-7 pb-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
              {reading.ref}
            </div>
            <h2 className="mt-2 font-serif text-4xl italic leading-tight text-ink">
              {reading.title}
            </h2>
            <div className="mt-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
              <BookOpen size={11} />
              {reading.estimate} read
            </div>
          </div>
          <button
            onClick={onClose}
            className="border border-ink/20 p-1.5 text-ink/40 transition hover:border-ink/50 hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>

        {/* Keystone verse */}
        <div className="bg-ink2 px-7 py-6">
          <blockquote className="font-serif text-xl italic leading-relaxed text-paper">
            {reading.verse}
          </blockquote>
          <cite className="mt-3 block font-mono text-[10px] uppercase not-italic tracking-[0.18em] text-gold">
            {reading.ref} &mdash; KJV
          </cite>
        </div>

        {/* Summary */}
        <div className="px-7 py-6">
          <p className="font-serif text-lg leading-relaxed text-ink/80">{reading.summary}</p>
        </div>

        {/* Reflection prompt */}
        <div className="mx-7 border-l-2 border-gold pl-5">
          <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-gold">
            Reflection
          </div>
          <p className="font-serif text-base italic leading-snug text-ink/75">
            {reading.reflectionPrompt}
          </p>
        </div>

        {/* Footer action */}
        <div className="flex items-center justify-between border-t border-ink/15 p-7 pt-5">
          {isDone ? (
            <div className="inline-flex items-center gap-3 border border-ink/20 bg-ink/5 px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ink/50">
              <Check size={13} />
              Completed
            </div>
          ) : (
            <button
              onClick={() => { onComplete(reading.id); onClose(); }}
              className="inline-flex items-center gap-3 bg-gold px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ink transition hover:bg-goldBright active:scale-95"
            >
              <Check size={13} />
              Mark Complete
            </button>
          )}
          <button
            onClick={onClose}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40 hover:text-ink transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const {
    progress,
    completedCount,
    totalReadings,
    streak,
    weeklyPattern,
    currentReading,
    nextReading,
    isCurrentDone,
    currentDay,
    markComplete,
  } = useProgress();

  const [showReading, setShowReading] = useState(false);
  const [showNext, setShowNext] = useState(false);

  return (
    <>
      {/* ── Meta bar ── */}
      <section className="grid border-b border-paper/15 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60 md:grid-cols-3">
        <span>{dashboard.dateLabel}</span>
        <span className="hidden text-center font-serif text-sm italic normal-case tracking-normal md:block">
          A quiet road through the text.
        </span>
        <span className="text-left md:text-right">
          Day {currentDay} of {totalReadings}
        </span>
      </section>

      {/* ── Hero ── */}
      <section className="grid min-h-[540px] border-b border-paper/15 lg:grid-cols-[1.04fr_0.96fr]">
        {/* Today's passage panel */}
        <div className="bg-paper px-5 py-10 text-ink sm:px-9 lg:border-r lg:border-ink/20">
          <div className="mb-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-14 bg-gold" />
            Today&apos;s Reading
            {isCurrentDone && (
              <span className="ml-auto flex items-center gap-1.5 text-[9px] text-ink/40">
                <Check size={11} className="text-gold" />
                Done
              </span>
            )}
          </div>

          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-gold/80">
            {currentReading.ref}
          </div>

          <h1 className="max-w-3xl font-serif text-[52px] italic leading-[0.9] tracking-normal text-ink sm:text-[72px] xl:text-[96px]">
            {currentReading.title.split(' ').map((word, i) =>
              i === Math.floor(currentReading.title.split(' ').length / 2) ? (
                <span key={i} className="text-gold">{word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>

          <div className="my-8 flex justify-between border-y border-ink/25 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.26em]">
            <span>{currentReading.ref}</span>
            <span className="font-mono font-normal opacity-65">{currentReading.estimate}</span>
          </div>

          <p className="max-w-2xl font-serif text-xl leading-relaxed text-ink/80">
            <span className="float-left pr-4 pt-2 font-serif text-[100px] font-semibold leading-[0.72] text-gold">
              {currentReading.verse[1]}
            </span>
            {currentReading.verse.slice(2)}
          </p>

          <button
            onClick={() => setShowReading(true)}
            className={`mt-8 inline-flex items-center gap-3 px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] transition active:scale-95 ${
              isCurrentDone
                ? 'border border-ink/25 text-ink/50 hover:border-ink/50'
                : 'bg-gold text-ink hover:bg-goldBright'
            }`}
          >
            {isCurrentDone ? <Check size={13} /> : <Play size={13} fill="currentColor" />}
            {isCurrentDone ? 'Review Reading' : 'Begin Reading'}
          </button>
        </div>

        {/* Plan progress panel */}
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
                  <span>{completedCount} completed</span>
                  <span>{totalReadings - completedCount} remain</span>
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
          <div className="mt-5 flex items-start gap-2 font-serif text-[96px] font-semibold leading-[0.84] text-paper">
            {streak}
            <sup className="mt-4 font-mono text-2xl font-normal text-gold">days</sup>
          </div>
          <StreakGrid pattern={weeklyPattern} />
        </article>

        <article className="border-b border-paper/15 p-7 lg:border-b-0 lg:border-r lg:border-paper/10">
          <div className="section-label">
            <BookOpen size={14} />
            Up Next
          </div>
          {nextReading ? (
            <>
              <h3 className="mt-5 font-serif text-4xl italic leading-none">{nextReading.title}</h3>
              <div className="mt-5 flex justify-between border-t border-paper/15 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/65">
                <span>{nextReading.ref}</span>
                <span>{nextReading.estimate}</span>
              </div>
              <button
                onClick={() => setShowNext(true)}
                className="mt-8 inline-flex items-center gap-3 border border-gold px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-ink"
              >
                <Play size={13} fill="currentColor" />
                Preview
              </button>
            </>
          ) : (
            <div className="mt-5 font-serif text-2xl italic text-paper/50">
              All readings complete.
            </div>
          )}
        </article>

        <article className="bg-gold p-7 text-ink">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/70">
            <CalendarDays size={14} />
            Reflection
            <span className="h-px flex-1 bg-ink/30" />
          </div>
          <blockquote className="mt-5 font-serif text-3xl italic leading-tight text-ink">
            {currentReading.reflectionPrompt}
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
        <span>Day {currentDay} &mdash; {dashboard.planName}</span>
      </footer>

      {/* ── Reading modal ── */}
      {showReading && (
        <ReadingModal
          reading={currentReading}
          isDone={isCurrentDone}
          onComplete={markComplete}
          onClose={() => setShowReading(false)}
        />
      )}

      {/* ── Next reading preview modal ── */}
      {showNext && nextReading && (
        <ReadingModal
          reading={nextReading}
          isDone={false}
          onComplete={id => { markComplete(id); setShowNext(false); }}
          onClose={() => setShowNext(false)}
        />
      )}
    </>
  );
}
