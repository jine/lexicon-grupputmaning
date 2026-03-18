import type {
	Difficulty,
	Flashcard,
	FlashcardCategory,
	FlashcardDeck,
	FlashcardStatus,
} from "@/types/flashcard";

// Raw JSON types (dates are strings, status is optional)
interface RawFlashcard {
	id: string;
	question: string;
	answer: string;
	difficulty: Difficulty;
	tags?: string[];
	hints?: string[];
}

interface RawFlashcardDeck {
	id: string;
	name: string;
	description: string;
	category: string;
	cards: RawFlashcard[];
}

import backendJson from "@/data/decks/backend.json";
import behavioralJson from "@/data/decks/behavioral.json";
// Import raw deck data
import frontendJson from "@/data/decks/frontend.json";
import systemDesignJson from "@/data/decks/system-design.json";

// Valid categories according to FlashcardCategory type
const VALID_CATEGORIES: FlashcardCategory[] = [
	"frontend",
	"backend",
	"system-design",
	"behavioral",
	"algorithms",
	"data-structures",
];

/**
 * Maps a string category to a valid FlashcardCategory.
 * Falls back to a default category based on the deck id if mapping fails.
 */
function mapCategory(category: string, deckId: string): FlashcardCategory {
	// Normalize the category string
	const normalized = category.toLowerCase().replace(/\s+/g, "-");

	// Check if it's already a valid category
	if (VALID_CATEGORIES.includes(normalized as FlashcardCategory)) {
		return normalized as FlashcardCategory;
	}

	// Map common variations to valid categories
	const categoryMap: Record<string, FlashcardCategory> = {
		technical: "frontend",
		architecture: "system-design",
		"soft-skills": "behavioral",
		language: "frontend",
		"cs-fundamentals": "algorithms",
	};

	if (categoryMap[normalized]) {
		return categoryMap[normalized];
	}

	// Try to match by deck id
	if (VALID_CATEGORIES.includes(deckId as FlashcardCategory)) {
		return deckId as FlashcardCategory;
	}

	// Default fallback
	return "frontend";
}

/**
 * Transforms raw flashcard data from JSON to the Flashcard type.
 * Adds missing fields with default values.
 */
function transformRawFlashcard(
	raw: RawFlashcard,
	category: FlashcardCategory,
): Flashcard {
	const now = new Date();

	return {
		id: raw.id,
		question: raw.question,
		answer: raw.answer,
		category,
		difficulty: raw.difficulty,
		tags: raw.tags ?? [],
		hints: raw.hints ?? [],
		status: "new" as FlashcardStatus,
		createdAt: now,
		updatedAt: now,
	};
}

/**
 * Transforms raw deck data from JSON to the FlashcardDeck type.
 * Calculates cardCount and adds missing date fields.
 */
function transformRawDeck(raw: RawFlashcardDeck): FlashcardDeck {
	const category = mapCategory(raw.category, raw.id);
	const now = new Date();

	const cards = raw.cards.map((card) => transformRawFlashcard(card, category));

	return {
		id: raw.id,
		name: raw.name,
		description: raw.description,
		category,
		cards,
		cardCount: cards.length,
		createdAt: now,
		updatedAt: now,
	};
}

// Cache for loaded decks
let decksCache: FlashcardDeck[] | null = null;

/**
 * Loads all decks from JSON files and transforms them.
 * Results are cached for subsequent calls.
 */
function loadDecks(): FlashcardDeck[] {
	if (decksCache) {
		return decksCache;
	}

	const rawDecks: RawFlashcardDeck[] = [
		frontendJson as RawFlashcardDeck,
		backendJson as RawFlashcardDeck,
		systemDesignJson as RawFlashcardDeck,
		behavioralJson as RawFlashcardDeck,
	];

	decksCache = rawDecks.map(transformRawDeck);
	return decksCache;
}

/**
 * Returns all flashcard decks.
 */
export function getAllDecks(): FlashcardDeck[] {
	return loadDecks();
}

/**
 * Returns a specific deck by its ID.
 * @param id - The deck ID to search for
 * @returns The matching deck or undefined if not found
 */
export function getDeckById(id: string): FlashcardDeck | undefined {
	const decks = loadDecks();
	return decks.find((deck) => deck.id === id);
}

/**
 * Returns all unique categories from the loaded decks.
 */
export function getDeckCategories(): FlashcardCategory[] {
	const decks = loadDecks();
	const categories = new Set<FlashcardCategory>();

	for (const deck of decks) {
		categories.add(deck.category);
	}

	return Array.from(categories).sort();
}

/**
 * Returns decks filtered by a specific category.
 * @param category - The category to filter by
 * @returns Array of decks matching the category
 */
export function getDecksByCategory(
	category: FlashcardCategory,
): FlashcardDeck[] {
	const decks = loadDecks();
	return decks.filter((deck) => deck.category === category);
}

/**
 * Clears the decks cache. Useful for testing or when data changes.
 */
export function clearDecksCache(): void {
	decksCache = null;
}
