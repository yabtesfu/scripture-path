import { useState, useCallback } from 'react';

const STORAGE_KEY = 'sp_journal_v1';

const SEED_ENTRIES = [
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

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ENTRIES));
  return SEED_ENTRIES;
}

function persist(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function useJournal() {
  const [entries, setEntries] = useState(loadEntries);

  const addEntry = useCallback((entry) => {
    setEntries(prev => {
      const next = [entry, ...prev];
      persist(next);
      return next;
    });
  }, []);

  return { entries, addEntry };
}
