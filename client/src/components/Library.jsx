import { useState } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

const BOOKS = [
  {
    id: 1,
    spine: 'Genesis',
    testament: 'OT',
    chapters: 50,
    color: '#8B3A3A',
    abbr: 'GEN',
    desc: 'The book of beginnings — creation, fall, flood, and the calling of Abraham. The foundation of covenant and promise.',
    quote: '"In the beginning God created the heavens and the earth."',
    ref: 'Genesis 1:1',
    themes: ['Creation', 'Covenant', 'Promise'],
  },
  {
    id: 2,
    spine: 'Exodus',
    testament: 'OT',
    chapters: 40,
    color: '#4A6741',
    abbr: 'EXO',
    desc: 'Deliverance from Egypt, the giving of the Law at Sinai, and the building of the Tabernacle. The birth of Israel as a nation.',
    quote: '"I AM WHO I AM."',
    ref: 'Exodus 3:14',
    themes: ['Deliverance', 'Law', 'Worship'],
  },
  {
    id: 3,
    spine: 'Psalms',
    testament: 'OT',
    chapters: 150,
    color: '#3A5A8B',
    abbr: 'PSA',
    desc: 'One hundred and fifty poems and songs spanning every human emotion — lament, praise, pilgrimage, and royal expectation.',
    quote: '"The Lord is my shepherd; I shall not want."',
    ref: 'Psalm 23:1',
    themes: ['Prayer', 'Praise', 'Lament'],
  },
  {
    id: 4,
    spine: 'Proverbs',
    testament: 'OT',
    chapters: 31,
    color: '#7A6B3A',
    abbr: 'PRO',
    desc: 'Practical wisdom for ordered living — fear of the Lord, honest speech, industrious work, and the formation of character.',
    quote: '"Trust in the Lord with all your heart."',
    ref: 'Proverbs 3:5',
    themes: ['Wisdom', 'Character', 'Speech'],
  },
  {
    id: 5,
    spine: 'Isaiah',
    testament: 'OT',
    chapters: 66,
    color: '#5A3A7A',
    abbr: 'ISA',
    desc: 'The greatest of the prophets — judgment and comfort, the Servant Songs, and the vision of a new creation and restored Zion.',
    quote: '"But they who wait for the Lord shall renew their strength."',
    ref: 'Isaiah 40:31',
    themes: ['Prophecy', 'Comfort', 'Restoration'],
  },
  {
    id: 6,
    spine: 'Matthew',
    testament: 'NT',
    chapters: 28,
    color: '#1A3A5A',
    abbr: 'MAT',
    desc: 'The Gospel of the Kingdom — five great discourses, ten miracles, and the fulfillment of Israel\'s scripture in the person of Jesus.',
    quote: '"Blessed are the poor in spirit, for theirs is the kingdom of heaven."',
    ref: 'Matthew 5:3',
    themes: ['Kingdom', 'Fulfillment', 'Discipleship'],
  },
  {
    id: 7,
    spine: 'John',
    testament: 'NT',
    chapters: 21,
    color: '#2A4A3A',
    abbr: 'JHN',
    desc: 'The theological Gospel — seven signs, seven "I am" statements, and the Farewell Discourse. Written that you may believe.',
    quote: '"In the beginning was the Word, and the Word was with God."',
    ref: 'John 1:1',
    themes: ['Belief', 'Life', 'Love'],
  },
  {
    id: 8,
    spine: 'Romans',
    testament: 'NT',
    chapters: 16,
    color: '#4A3A2A',
    abbr: 'ROM',
    desc: 'Paul\'s systematic presentation of the Gospel — sin, justification by faith, sanctification, election, and the mystery of Israel.',
    quote: '"For I am not ashamed of the gospel, for it is the power of God for salvation."',
    ref: 'Romans 1:16',
    themes: ['Justification', 'Faith', 'Grace'],
  },
  {
    id: 9,
    spine: 'Revelation',
    testament: 'NT',
    chapters: 22,
    color: '#3A2A5A',
    abbr: 'REV',
    desc: 'Apocalyptic visions given to John on Patmos — letters to seven churches, cosmic conflict, and the new Jerusalem descending.',
    quote: '"Behold, I am making all things new."',
    ref: 'Revelation 21:5',
    themes: ['Hope', 'Worship', 'Victory'],
  },
];

function SpineShelf({ books, selectedId, onSelect }) {
  return (
    <div className="flex overflow-x-auto border-b border-paper/10 pb-0">
      {books.map((book) => (
        <button
          key={book.id}
          onClick={() => onSelect(book)}
          title={book.spine}
          className="group relative shrink-0 transition-all hover:-translate-y-1"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <div
            className={`flex h-40 w-10 cursor-pointer flex-col items-center justify-end pb-3 transition-all ${
              selectedId === book.id ? 'ring-2 ring-gold' : ''
            }`}
            style={{ background: selectedId === book.id ? book.color : `${book.color}aa` }}
          >
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-white/80">
              {book.abbr}
            </span>
          </div>
          <span
            className="absolute -bottom-px left-0 right-0 h-px transition-all"
            style={{ background: selectedId === book.id ? '#C68E4F' : 'transparent' }}
          />
        </button>
      ))}
    </div>
  );
}

export default function Library({ onTabChange }) {
  const [selected, setSelected] = useState(BOOKS[5]); // Matthew default

  return (
    <>
      {/* ── Header ── */}
      <section className="border-b border-paper/15 py-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/40">Browse</div>
        <h2 className="mt-3 font-serif text-5xl italic leading-none text-paper sm:text-6xl">
          The Library
        </h2>
        <p className="mt-4 max-w-xl font-serif text-xl leading-relaxed text-paper/55">
          Sixty-six books. One story. Select a volume from the shelf to read its introduction.
        </p>
      </section>

      {/* ── Book spine shelf ── */}
      <section className="border-b border-paper/15">
        <div className="flex items-end gap-0">
          <div className="shrink-0 border-r border-paper/10 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
            <div className="mb-2">OT</div>
            <div className="mt-4 text-paper/20">NT</div>
          </div>
          <SpineShelf books={BOOKS} selectedId={selected.id} onSelect={setSelected} />
        </div>
      </section>

      {/* ── Featured book detail ── */}
      <section className="grid min-h-[420px] border-b border-paper/15 lg:grid-cols-[0.45fr_1fr]">
        {/* Color slab */}
        <div
          className="relative flex flex-col justify-between overflow-hidden p-8 sm:p-10"
          style={{ background: selected.color }}
        >
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0_50%,transparent_50%)]" />
          <div className="relative">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
              {selected.testament === 'OT' ? 'Old Testament' : 'New Testament'}
            </div>
            <h3 className="mt-4 font-serif text-6xl italic leading-none text-white">
              {selected.spine}
            </h3>
          </div>
          <div className="relative mt-8 border-t border-white/20 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
            {selected.chapters} chapters
          </div>
        </div>

        {/* Text panel */}
        <div className="bg-ink2 p-8 sm:p-10">
          <div className="mb-6 flex flex-wrap gap-2">
            {selected.themes.map(t => (
              <span key={t} className="border border-paper/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/50">
                {t}
              </span>
            ))}
          </div>
          <p className="font-serif text-xl leading-relaxed text-paper/80">{selected.desc}</p>

          <blockquote className="mt-8 border-l-2 border-gold pl-5">
            <p className="font-serif text-2xl italic leading-snug text-paper">{selected.quote}</p>
            <cite className="mt-3 block font-mono text-[10px] uppercase not-italic tracking-[0.18em] text-gold">
              {selected.ref}
            </cite>
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onTabChange?.('plans')}
              className="inline-flex items-center gap-3 border border-gold px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-ink"
            >
              <BookOpen size={13} />
              Start Reading
            </button>
            <button
              onClick={() => onTabChange?.('plans')}
              className="inline-flex items-center gap-3 border border-paper/20 px-5 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/60 transition hover:border-paper/50 hover:text-paper"
            >
              <ExternalLink size={13} />
              View Chapter List
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats row ── */}
      <section className="grid border-b border-paper/15 md:grid-cols-4">
        {[
          { label: 'Books',    value: '66' },
          { label: 'Chapters', value: '1,189' },
          { label: 'Verses',   value: '31,102' },
          { label: 'Authors',  value: '40+' },
        ].map(stat => (
          <div key={stat.label} className="border-b border-paper/10 p-7 text-center md:border-b-0 md:border-r last:md:border-r-0">
            <div className="font-serif text-5xl text-paper">{stat.value}</div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ── Browse grid ── */}
      <section className="py-10">
        <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-paper/40">All Books</div>
        <div className="grid gap-px border border-paper/10 bg-paper/10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {BOOKS.map(book => (
            <button
              key={book.id}
              onClick={() => setSelected(book)}
              className={`group flex items-center justify-between bg-ink2 p-4 text-left transition hover:bg-ink3 ${
                selected.id === book.id ? 'border-l-2 border-gold pl-3.5' : ''
              }`}
            >
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-gold">{book.abbr}</div>
                <div className="mt-1 font-serif text-base italic text-paper group-hover:text-goldBright transition-colors">
                  {book.spine}
                </div>
                <div className="mt-1 font-mono text-[9px] text-paper/35">{book.chapters} ch.</div>
              </div>
              <div className="h-8 w-1.5 rounded-sm" style={{ background: book.color }} />
            </button>
          ))}
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 py-7 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
        <span>Scripture Path Library</span>
        <span>{BOOKS.length} books indexed</span>
      </footer>
    </>
  );
}
