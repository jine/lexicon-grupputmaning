import type { Flashcard, FlashcardDeck } from "@/types/flashcard";
import frontendData from "@/data/decks/frontend.json";
import backendData from "@/data/decks/backend.json";
import systemDesignData from "@/data/decks/system-design.json";
import behavioralData from "@/data/decks/behavioral.json";

interface RawCard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  tags?: string[];
}

interface RawDeck {
  id: string;
  name: string;
  description: string;
  category: string;
  cards: RawCard[];
}

function transformCard(rawCard: RawCard): Flashcard {
  const now = new Date();
  return {
    id: rawCard.id,
    question: rawCard.question,
    answer: rawCard.answer,
    category: rawCard.category as Flashcard["category"],
    difficulty: rawCard.difficulty,
    tags: rawCard.tags || [],
    hints: [],
    status: "new",
    createdAt: now,
    updatedAt: now,
  };
}

function transformDeck(rawDeck: RawDeck): FlashcardDeck {
  const now = new Date();
  const cards = rawDeck.cards.map(transformCard);
  
  return {
    id: rawDeck.id,
    name: rawDeck.name,
    description: rawDeck.description,
    category: rawDeck.category as FlashcardDeck["category"],
    cards,
    cardCount: cards.length,
    createdAt: now,
    updatedAt: now,
  };
}

const rawDecks: RawDeck[] = [
  frontendData as RawDeck,
  backendData as RawDeck,
  systemDesignData as RawDeck,
  behavioralData as RawDeck,
];

const decks: FlashcardDeck[] = rawDecks.map(transformDeck);

export function getAllDecks(): FlashcardDeck[] {
  return decks;
}

export function getDeckById(id: string): FlashcardDeck | undefined {
  return decks.find((deck) => deck.id === id);
}

export function getDeckCategories(): string[] {
  return [...new Set(decks.map((deck) => deck.category))];
}

export function getDecksByCategory(category: string): FlashcardDeck[] {
  return decks.filter((deck) => deck.category === category);
}

export function getTotalCardCount(): number {
  return decks.reduce((total, deck) => total + deck.cardCount, 0);
}

export { decks };
export default decks;
