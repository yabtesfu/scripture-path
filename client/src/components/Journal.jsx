import { useState } from 'react';
import { ChevronDown, ChevronUp, Edit3, Plus } from 'lucide-react';
import { useJournal } from '../hooks/useJournal.js';
import { useProgress } from '../hooks/useProgress.js';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatDate(d) {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function EntryCard({ entry, isExpanded, onToggle }) {
  return (
    <article
      className={`border-b border-paper/10 transition-all ${isExpanded ? 'bg-ink2' : 'hover:bg-ink2/50'}`}
    >
      <button
        className="w-full cursor-pointer p-6 text-left sm:p-7"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">
              <span>{entry.day}</span>
              <span className="text-paper/20">—</span>
              <span>{entry.date}</span>
              <span className="text-paper/20">—</span>
              <span className="text-gold">{entry.planDay}</span>
              <span className="text-paper/20">—</span>
              <span>{entry.passage}</span>
            </div>
            <h3 className={`mt-3 font-serif text-2xl italic leading-tight transition-colors ${
              isExpanded ? 'text-goldBright' : 'text-paper'
            }`}>
              {entry.title}
            </h3>
            <p className="mt-3 font-serif text-base leading-relaxed text-paper/60">
              {entry.preview}
            </p>
          </div>
          <span className="mt-1 shrink-0 text-paper/30">
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-8 sm:px-7">
          <div className="border-t border-paper/10 pt-6">
            <div className="prose-journal">
              {entry.full.split('\n\n').map((para, i) => (
                <p key={i} className={`font-serif text-lg leading-relaxed text-paper/80 ${i > 0 ? 'mt-5' : ''}`}>
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {entry.tags.map(tag => (
                  <span key={tag} className="border border-paper/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/45">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{entry.mood}</span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Journal() {
  const { entries, addEntry } = useJournal();
  const { currentReading, currentDay, totalReadings } = useProgress();

  const [expandedId, setExpandedId] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftText, setDraftText] = useState('');

  const featured = entries[0];
  const rest = entries.slice(1);

  function toggleEntry(id) {
    setExpandedId(prev => (prev === id ? null : id));
  }

  function handleSave() {
    if (!draftText.trim()) return;
    const now = new Date();
    const entry = {
      id: Date.now(),
      date: formatDate(now),
      day: WEEKDAYS[now.getDay()],
      passage: currentReading.ref,
      planDay: `Day ${currentDay}`,
      title: draftTitle.trim() || currentReading.title,
      preview: draftText.trim().slice(0, 180),
      full: draftText.trim(),
      mood: 'Reflective',
      tags: ['Matthew', 'Journal'],
      featured: false,
    };
    addEntry(entry);
    setShowNew(false);
    setDraftTitle('');
    setDraftText('');
  }

  return (
    <>
      {/* ── Header ── */}
      <section className="grid items-end gap-6 border-b border-paper/15 py-10 sm:grid-cols-[1fr_auto]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/40">Personal Reflections</div>
          <h2 className="mt-3 font-serif text-5xl italic leading-none text-paper sm:text-6xl">
            Journal
          </h2>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-3 bg-gold px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ink transition hover:bg-goldBright"
        >
          <Plus size={14} />
          New Entry
        </button>
      </section>

      {/* ── Featured / latest entry ── */}
      {featured && (
        <section className="grid border-b border-paper/15 lg:grid-cols-[1fr_0.8fr]">
          <div className="border-b border-paper/15 bg-paper p-8 text-ink sm:p-10 lg:border-b-0 lg:border-r lg:border-ink/15">
            <div className="mb-5 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-10 bg-gold" />
              Latest Entry
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
              {featured.day}, {featured.date} &mdash; {featured.passage}
            </div>
            <h3 className="mt-4 font-serif text-4xl italic leading-tight text-ink sm:text-5xl">
              {featured.title}
            </h3>
            <div className="my-6 h-px bg-ink/15" />
            {featured.full.split('\n\n').slice(0, 2).map((para, i) => (
              <p key={i} className={`font-serif text-xl leading-relaxed text-ink/80 ${i > 0 ? 'mt-4' : ''}`}>
                {para}
              </p>
            ))}
            <button
              onClick={() => setExpandedId(featured.id)}
              className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold hover:text-goldBright transition-colors"
            >
              Read full entry
              <ChevronDown size={13} />
            </button>
          </div>

          <div className="flex flex-col justify-between bg-ink2 p-8 sm:p-10">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40">Plan Day</div>
              <div className="mt-2 font-serif text-7xl italic leading-none text-gold">{currentDay}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/35">of {totalReadings} &mdash; Sermon on the Mount</div>
            </div>
            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40">Reflection Tone</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Contemplative', 'Quiet', 'Alert', 'Humble', 'Joyful', 'Troubled'].map(tone => (
                  <span
                    key={tone}
                    className={`border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] transition ${
                      tone === featured.mood
                        ? 'border-gold bg-gold/15 text-gold'
                        : 'border-paper/15 text-paper/35'
                    }`}
                  >
                    {tone}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 border-t border-paper/10 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
              {entries.length} entries this plan
            </div>
          </div>
        </section>
      )}

      {/* ── Entry index ── */}
      <section className="border-b border-paper/15">
        <div className="flex items-center justify-between px-6 py-4 sm:px-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40">
            All Entries — {entries.length} total
          </span>
          <button
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35 hover:text-paper transition-colors"
            onClick={() => setExpandedId(null)}
          >
            Collapse all
          </button>
        </div>

        {featured && (
          <EntryCard
            entry={featured}
            isExpanded={expandedId === featured.id}
            onToggle={() => toggleEntry(featured.id)}
          />
        )}

        {rest.map(entry => (
          <EntryCard
            key={entry.id}
            entry={entry}
            isExpanded={expandedId === entry.id}
            onToggle={() => toggleEntry(entry.id)}
          />
        ))}
      </section>

      {/* ── New entry panel ── */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" onClick={e => { if (e.target === e.currentTarget) setShowNew(false); }}>
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" onClick={() => setShowNew(false)} />
          <div className="relative z-10 w-full max-w-2xl border border-paper/15 bg-ink2 p-8 sm:p-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">New Entry</div>
                <h3 className="mt-1 font-serif text-3xl italic text-paper">Today&apos;s Reflection</h3>
              </div>
              <button
                onClick={() => setShowNew(false)}
                className="border border-paper/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50 transition hover:border-paper/50 hover:text-paper"
              >
                Cancel
              </button>
            </div>

            <div className="mb-4 flex flex-wrap gap-3 border-b border-paper/10 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45">
              <span>{currentReading.ref}</span>
              <span className="text-paper/20">—</span>
              <span className="text-gold">Day {currentDay}</span>
            </div>

            <input
              value={draftTitle}
              onChange={e => setDraftTitle(e.target.value)}
              placeholder={currentReading.title}
              className="mb-4 w-full bg-transparent font-serif text-2xl italic text-paper placeholder:text-paper/25 focus:outline-none"
            />

            <textarea
              value={draftText}
              onChange={e => setDraftText(e.target.value)}
              placeholder="Begin writing your reflection…"
              rows={9}
              className="w-full resize-none bg-transparent font-serif text-xl leading-relaxed text-paper placeholder:text-paper/20 focus:outline-none"
              autoFocus={false}
            />

            <div className="mt-6 flex items-center justify-between border-t border-paper/10 pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/30">
                {draftText.split(/\s+/).filter(Boolean).length} words
              </span>
              <button
                onClick={handleSave}
                disabled={!draftText.trim()}
                className="inline-flex items-center gap-3 bg-gold px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ink transition hover:bg-goldBright disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Edit3 size={13} />
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="flex flex-wrap items-center justify-between gap-4 py-7 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
        <span>Scripture Path Journal</span>
        <span>{entries.length} entries &mdash; Sermon on the Mount</span>
      </footer>
    </>
  );
}
