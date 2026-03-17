export type FlashcardCategory =
  | 'frontend'
  | 'backend'
  | 'system-design'
  | 'behavioral'
  | 'algorithms'
  | 'data-structures';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type FlashcardStatus = 'new' | 'learning' | 'mastered';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: FlashcardCategory;
  difficulty: Difficulty;
  tags?: string[];
  hints?: string[];
  status: FlashcardStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  category: FlashcardCategory;
  cards: Flashcard[];
  cardCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  userId: string;
  totalCardsStudied: number;
  cardsMastered: number;
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  level: number;
  lastStudiedAt: Date;
}

export interface FlashcardProgress {
  flashcardId: string;
  status: FlashcardStatus;
  timesReviewed: number;
  timesCorrect: number;
  lastReviewedAt: Date;
  nextReviewAt: Date;
  easeFactor: number;
  interval: number;
}

export interface DeckProgress {
  deckId: string;
  cardsStudied: number;
  cardsMastered: number;
  progressPercentage: number;
  lastStudiedAt: Date;
}

export interface StudySession {
  id: string;
  deckId: string;
  startedAt: Date;
  completedAt?: Date;
  cardsStudied: number;
  cardsCorrect: number;
  pointsEarned: number;
}

export interface FlashcardProps {
  card: Flashcard;
  onFlip?: () => void;
  isFlipped?: boolean;
  onMarkCorrect?: () => void;
  onMarkIncorrect?: () => void;
}

export interface DeckCard extends Flashcard {
  deckId: string;
}
