import { useMemo, useState } from 'react';
import { BookMarked, Languages, Music2, Search } from 'lucide-react';
import { bookRecommendations, musicRecommendations, wordStudies } from '../data/study.js';

function SectionHeader({ icon: Icon, eyebrow, title }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
          <Icon size={14} />
          {eyebrow}
        </div>
        <h3 className="mt-3 font-serif text-4xl italic leading-none text-paper">{title}</h3>
      </div>
    </div>
  );
}

function WordStudyPanel({ selected, onSelect }) {
  return (
    <section className="grid border-b border-paper/15 lg:grid-cols-[0.42fr_1fr]">
      <div className="border-b border-paper/15 bg-paper p-7 text-ink sm:p-9 lg:border-b-0 lg:border-r lg:border-ink/15">
        <SectionHeader icon={Languages} eyebrow="Original Words" title="Word Study" />
        <div className="grid gap-2">
          {wordStudies.map(word => (
            <button
              key={word.id}
              onClick={() => onSelect(word)}
              className={`flex items-center justify-between border p-4 text-left transition ${
                selected.id === word.id
                  ? 'border-gold bg-gold/15'
                  : 'border-ink/10 hover:border-gold/60'
              }`}
            >
              <span>
                <span className="block font-serif text-2xl italic text-ink">{word.term}</span>
                <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45">
                  {word.language} - {word.passage}
                </span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold">
                {word.language.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-ink2 p-7 sm:p-9">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{selected.passage}</div>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <h2 className="font-serif text-6xl italic leading-none text-paper">{selected.term}</h2>
          <span className="pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
            {selected.language}
          </span>
        </div>
        <div className="mt-5 border-y border-paper/10 py-4 font-serif text-2xl italic text-goldBright">
          {selected.gloss}
        </div>
        <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed text-paper/75">{selected.note}</p>
        <blockquote className="mt-8 border-l-2 border-gold pl-5 font-serif text-2xl italic leading-tight text-paper">
          {selected.prompt}
        </blockquote>
      </div>
    </section>
  );
}

export default function Study() {
  const [query, setQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState(wordStudies[0]);

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return bookRecommendations;
    return bookRecommendations.filter(book =>
      [book.title, book.author, book.theme, book.pairing].some(value => value.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <>
      <section className="grid items-end gap-6 border-b border-paper/15 py-10 lg:grid-cols-[1fr_0.72fr]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/40">Study Companion</div>
          <h2 className="mt-3 font-serif text-5xl italic leading-none text-paper sm:text-6xl">
            Notes, Music, Books
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-xl leading-relaxed text-paper/55">
            A place for deeper context after the reading: original-language notes, listening pairings, and books that match the passage.
          </p>
        </div>
        <label className="flex items-center gap-3 border border-paper/15 bg-ink2 px-4 py-3">
          <Search size={15} className="text-gold" />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search book recommendations"
            className="w-full bg-transparent font-mono text-[11px] uppercase tracking-[0.14em] text-paper placeholder:text-paper/25 focus:outline-none"
          />
        </label>
      </section>

      <WordStudyPanel selected={selectedWord} onSelect={setSelectedWord} />

      <section className="grid border-b border-paper/15 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="border-b border-paper/15 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:border-paper/10">
          <SectionHeader icon={Music2} eyebrow="Listening" title="Music Pairings" />
          <div className="grid gap-px border border-paper/10 bg-paper/10">
            {musicRecommendations.map(track => (
              <article key={track.id} className="bg-ink2 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{track.mood}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper/35">{track.bestFor}</span>
                </div>
                <h4 className="mt-3 font-serif text-3xl italic leading-tight text-paper">{track.title}</h4>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40">{track.artist}</div>
                <p className="mt-4 font-serif text-lg leading-relaxed text-paper/65">{track.reason}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="p-7 sm:p-9">
          <SectionHeader icon={BookMarked} eyebrow="Reading" title="Book Recommendations" />
          <div className="grid gap-px border border-paper/10 bg-paper/10">
            {filteredBooks.map(book => (
              <article key={book.id} className="grid gap-4 bg-ink2 p-5 sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{book.theme}</div>
                  <h4 className="mt-2 font-serif text-3xl italic leading-tight text-paper">{book.title}</h4>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40">
                    {book.author}
                  </div>
                  <p className="mt-4 font-serif text-lg leading-relaxed text-paper/65">{book.note}</p>
                </div>
                <div className="self-start border border-paper/15 px-3 py-2 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-paper/45">
                  {book.pairing}
                </div>
              </article>
            ))}
            {!filteredBooks.length && (
              <div className="bg-ink2 p-6 font-serif text-xl italic text-paper/50">No recommendations found.</div>
            )}
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 py-7 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
        <span>Scripture Path Study</span>
        <span>{wordStudies.length} words - {musicRecommendations.length} mixes - {bookRecommendations.length} books</span>
      </footer>
    </>
  );
}
