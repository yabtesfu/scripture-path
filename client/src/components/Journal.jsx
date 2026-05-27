import { useState } from 'react';
import { ChevronDown, ChevronUp, Edit3, Plus } from 'lucide-react';

const ENTRIES = [
  {
    id: 1,
    date: 'May 26, 2026',
    day: 'Monday',
    passage: 'Matthew 5:1–12',
    planDay: 'Day 17',
    title: 'The Upside-Down Kingdom',
    preview: 'I keep returning to the word "blessed." It is not a reward held out in front — it is a declaration about what is already true for those who mourn, who hunger, who are poor in spirit.',
    full: `I keep returning to the word "blessed." It is not a reward held out in front — it is a declaration about what is already true for those who mourn, who hunger, who are poor in spirit.

Jesus begins the Sermon by turning the world's logic on its head. The successful, the powerful, the comfortable — these are not the blessed ones. The ones at the margins, the ones whose hands are empty, are the ones who receive the kingdom.

I notice that I spend most of my energy trying to fill my hands. I am not naturally poor in spirit. I accumulate — opinions, certainties, security. The Beatitudes ask me to notice what emptiness might open.

What would it mean to mourn well? Not to wallow but to sit long enough with what is broken to really feel it — and then to discover the comfort that does not paper over the wound but enters it.

Sentence I carry: "Blessed are the pure in heart, for they shall see God."`,
    mood: 'Contemplative',
    tags: ['Matthew', 'Beatitudes', 'Kingdom'],
    featured: true,
  },
  {
    id: 2,
    date: 'May 25, 2026',
    day: 'Sunday',
    passage: 'Matthew 4:18–25',
    planDay: 'Day 16',
    title: 'Leave the Nets',
    preview: 'The call comes without explanation. No credentials, no interview, no theological test. Just: "Follow me." And they left immediately.',
    full: `The call comes without explanation. No credentials, no interview, no theological test. Just: "Follow me." And they left immediately.

I wonder what Peter and Andrew had been thinking about that morning. Whether they had any restlessness, any premonition that something was coming. Or whether it was entirely sudden — a stranger's voice, and the whole shape of their life pivoted.

What are my nets? The question is almost too easy to answer in the abstract. But concretely, today: what am I holding onto so tightly that I cannot take the next step?

The passage notes that they were casting nets when called. They were doing their ordinary work. The call arrived in the middle of the ordinary.`,
    mood: 'Reflective',
    tags: ['Matthew', 'Calling', 'Discipleship'],
    featured: false,
  },
  {
    id: 3,
    date: 'May 24, 2026',
    day: 'Saturday',
    passage: 'Matthew 4:1–11',
    planDay: 'Day 15',
    title: 'Bread and Stones',
    preview: 'Three temptations, each aimed at a different register: provision, protection, power. The devil offers shortcuts to everything Jesus is supposed to become.',
    full: `Three temptations, each aimed at a different register: provision, protection, power. The devil offers shortcuts to everything Jesus is supposed to become.

"If you are the Son of God" — the phrase repeats like a splinter. Identity is the real target. If Jesus can be made to act from anxiety about who he is, the temptations win. But Jesus answers each time from the bedrock of Scripture, and the deepest answer is: I know whose I am, and that is enough.

The bread: I don't need to manufacture evidence of God's care.
The pinnacle: I don't need to stage a rescue to prove I am loved.
The kingdoms: I don't need to grasp what will be given.

The pattern is recognizable. I test God when I am afraid that God has forgotten. I perform for love I already have. I take when I could wait.`,
    mood: 'Alert',
    tags: ['Matthew', 'Temptation', 'Identity'],
    featured: false,
  },
  {
    id: 4,
    date: 'May 23, 2026',
    day: 'Friday',
    passage: 'Matthew 3:13–17',
    planDay: 'Day 14',
    title: 'This Is My Beloved',
    preview: 'The voice from heaven does not say what Jesus will accomplish. It says who he is. "My beloved Son, in whom I am well pleased." Before one miracle, before one sermon.',
    full: `The voice from heaven does not say what Jesus will accomplish. It says who he is. "My beloved Son, in whom I am well pleased." Before one miracle, before one sermon.

I have been conditioned to read identity as achievement — I am what I produce, what I accomplish, what I get right. But the declaration at the Jordan runs in exactly the opposite direction. The pleasure precedes the performance.

I wonder if this is the deepest thing the Sermon on the Mount will ask of me: to live from a love that does not need to be earned, rather than toward a love I am still trying to secure.

What would change in my ordinary day if I believed — really believed — that before anything I do, I am beloved?`,
    mood: 'Quiet',
    tags: ['Matthew', 'Baptism', 'Identity', 'Love'],
    featured: false,
  },
  {
    id: 5,
    date: 'May 22, 2026',
    day: 'Thursday',
    passage: 'Matthew 3:1–12',
    planDay: 'Day 13',
    title: 'Prepare the Way',
    preview: 'John stands at the hinge of the ages. His clothing, his food, his location — everything is pointed away from himself and toward the one coming after.',
    full: `John stands at the hinge of the ages. His clothing, his food, his location — everything is pointed away from himself and toward the one coming after.

There is a kind of ministry that requires getting out of the way. John knows exactly what he is: a voice crying in the wilderness. Not the word, the voice. Not the light, the lamp.

I think about the people who have played that role in my own life. Teachers who gave me something and then sent me on. Friends who spoke a word that opened a door they couldn't enter themselves.

What does it mean to prepare a way? To clear space, remove obstacles, make the ground level. The prophetic work is often not dramatic — it is the slow, unglamorous work of preparation.`,
    mood: 'Humble',
    tags: ['Matthew', 'John the Baptist', 'Vocation'],
    featured: false,
  },
];

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
  const [expandedId, setExpandedId] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [draftText, setDraftText] = useState('');

  const featured = ENTRIES[0];
  const rest = ENTRIES.slice(1);

  function toggleEntry(id) {
    setExpandedId(prev => (prev === id ? null : id));
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
            <div className="mt-2 font-serif text-7xl italic leading-none text-gold">18</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/35">of 40 &mdash; Sermon on the Mount</div>
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
            {ENTRIES.length} entries this plan
          </div>
        </div>
      </section>

      {/* ── Entry index ── */}
      <section className="border-b border-paper/15">
        <div className="flex items-center justify-between px-6 py-4 sm:px-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40">
            All Entries — {ENTRIES.length} total
          </span>
          <button
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35 hover:text-paper transition-colors"
            onClick={() => setExpandedId(null)}
          >
            Collapse all
          </button>
        </div>

        {/* Featured entry in list */}
        <EntryCard
          entry={featured}
          isExpanded={expandedId === featured.id}
          onToggle={() => toggleEntry(featured.id)}
        />

        {/* Rest of entries */}
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
              <span>Matthew 5:1–12</span>
              <span className="text-paper/20">—</span>
              <span className="text-gold">Day 18</span>
            </div>

            <textarea
              value={draftText}
              onChange={e => setDraftText(e.target.value)}
              placeholder="Begin writing your reflection…"
              rows={10}
              className="w-full resize-none bg-transparent font-serif text-xl leading-relaxed text-paper placeholder:text-paper/20 focus:outline-none"
              autoFocus
            />

            <div className="mt-6 flex items-center justify-between border-t border-paper/10 pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/30">
                {draftText.split(/\s+/).filter(Boolean).length} words
              </span>
              <button
                onClick={() => { alert('Saved! (Backend integration coming soon.)'); setShowNew(false); setDraftText(''); }}
                className="inline-flex items-center gap-3 bg-gold px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-ink transition hover:bg-goldBright"
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
        <span>{ENTRIES.length} entries &mdash; Sermon on the Mount</span>
      </footer>
    </>
  );
}
