interface Deck {
  id: string;
  title: string;
  description: string;
  cardCount: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
}

const decks: Deck[] = [
  {
    id: "frontend",
    title: "Frontend Mastery",
    description: "React, Vue, CSS, DOM manipulation, and modern browser APIs",
    cardCount: 145,
    difficulty: "Intermediate",
    category: "Technical",
  },
  {
    id: "backend",
    title: "Backend Architecture",
    description: "APIs, databases, microservices, and server optimization",
    cardCount: 128,
    difficulty: "Advanced",
    category: "Technical",
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Scalability, caching, load balancing, and distributed systems",
    cardCount: 89,
    difficulty: "Advanced",
    category: "Architecture",
  },
  {
    id: "javascript",
    title: "JavaScript Core",
    description: "ES6+, closures, async/await, prototypes, and event loop",
    cardCount: 112,
    difficulty: "Intermediate",
    category: "Language",
  },
  {
    id: "behavioral",
    title: "Behavioral Questions",
    description: "STAR method, conflict resolution, and leadership scenarios",
    cardCount: 76,
    difficulty: "Beginner",
    category: "Soft Skills",
  },
  {
    id: "algorithms",
    title: "Data Structures",
    description: "Arrays, trees, graphs, sorting, and Big O notation",
    cardCount: 95,
    difficulty: "Intermediate",
    category: "CS Fundamentals",
  },
];

function DeckCard({ deck }: { deck: Deck }) {
  const difficultyColor = {
    Beginner: "text-[#00d4aa]",
    Intermediate: "text-[#ffa726]",
    Advanced: "text-[#ff6b9d]",
  }[deck.difficulty];

  return (
    <div className="bg-[#1a1a1a] rounded border border-[#2a2a2a] p-4 hover:border-[#3a3a3a] cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-[#f5f5f5]">{deck.title}</h3>
        <span className={`text-xs ${difficultyColor}`}>{deck.difficulty}</span>
      </div>
      <p className="text-sm text-[#888] mb-4">{deck.description}</p>
      <div className="flex items-center justify-between text-xs text-[#666]">
        <span>{deck.category}</span>
        <span>{deck.cardCount} cards</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#f5f5f5] mb-2">Flashcard Decks</h2>
        <p className="text-sm text-[#888]">Select a deck to start studying</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
        <h3 className="text-lg font-semibold text-[#f5f5f5] mb-4">Your Progress</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#1a1a1a] rounded border border-[#2a2a2a] p-4">
            <div className="text-2xl font-bold text-[#f5f5f5]">12</div>
            <div className="text-xs text-[#888]">Day Streak</div>
          </div>
          <div className="bg-[#1a1a1a] rounded border border-[#2a2a2a] p-4">
            <div className="text-2xl font-bold text-[#f5f5f5]">847</div>
            <div className="text-xs text-[#888]">Cards Reviewed</div>
          </div>
          <div className="bg-[#1a1a1a] rounded border border-[#2a2a2a] p-4">
            <div className="text-2xl font-bold text-[#f5f5f5]">4.8</div>
            <div className="text-xs text-[#888]">Avg Mastery</div>
          </div>
          <div className="bg-[#1a1a1a] rounded border border-[#2a2a2a] p-4">
            <div className="text-2xl font-bold text-[#f5f5f5]">92%</div>
            <div className="text-xs text-[#888]">Retention Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
