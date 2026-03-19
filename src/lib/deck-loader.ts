import agileJson from "@/data/agile.json";
import apiJson from "@/data/api.json";
import backendJson from "@/data/backend.json";
import behavioralJson from "@/data/behavioral.json";
import cssJson from "@/data/css.json";
import frontendJson from "@/data/frontend.json";
import gitJson from "@/data/git.json";
import nextjsJson from "@/data/nextjs.json";
import systemDesignJson from "@/data/system-design.json";
import typescriptJson from "@/data/typescript.json";
import wcagJson from "@/data/wcag.json";
import type {
	Difficulty,
	Flashcard,
	FlashcardCategory,
	FlashcardDeck,
	FlashcardStatus,
} from "@/types/flashcard";

interface RawFlashcard {
	id: string;
	question: string;
	answer: string;
	difficulty: Difficulty;
	tags?: string[];
	hints?: string[];
	category?: string;
	status?: FlashcardStatus;
	createdAt?: string;
	updatedAt?: string;
}

interface RawFlashcardDeck {
	id: string;
	name: string;
	description: string;
	category: string;
	cards: RawFlashcard[];
}

const VALID_CATEGORIES: FlashcardCategory[] = [
	"frontend",
	"backend",
	"system-design",
	"behavioral",
	"algorithms",
	"data-structures",
	"css",
	"accessibility",
];

function mapCategory(category: string, deckId: string): FlashcardCategory {
	const normalized = category.toLowerCase().replace(/\s+/g, "-");

	if (VALID_CATEGORIES.includes(normalized as FlashcardCategory)) {
		return normalized as FlashcardCategory;
	}

	const categoryMap: Record<string, FlashcardCategory> = {
		technical: "frontend",
		architecture: "system-design",
		"soft-skills": "behavioral",
		language: "frontend",
		"cs-fundamentals": "algorithms",
		css: "css",
		wcag: "accessibility",
		accessibility: "accessibility",
		git: "frontend",
		typescript: "frontend",
		nextjs: "frontend",
		api: "backend",
		agile: "behavioral",
	};

	if (categoryMap[normalized]) {
		return categoryMap[normalized];
	}

	if (VALID_CATEGORIES.includes(deckId as FlashcardCategory)) {
		return deckId as FlashcardCategory;
	}

	const idMatch = deckId.match(/deck-(.+)/);
	if (idMatch) {
		const extractedCategory = idMatch[1].toLowerCase();
		if (VALID_CATEGORIES.includes(extractedCategory as FlashcardCategory)) {
			return extractedCategory as FlashcardCategory;
		}
	}

	return "frontend";
}

function transformRawFlashcard(
	raw: RawFlashcard,
	deckCategory: FlashcardCategory,
): Flashcard {
	const now = new Date();

	// Use per-card category if present, otherwise fall back to deck category
	const cardCategory = raw.category
		? mapCategory(raw.category, "")
		: deckCategory;

	return {
		id: raw.id,
		question: raw.question,
		answer: raw.answer,
		category: cardCategory,
		difficulty: raw.difficulty,
		tags: raw.tags ?? [],
		hints: raw.hints ?? [],
		status: (raw.status as FlashcardStatus) ?? "new",
		createdAt: raw.createdAt ? new Date(raw.createdAt) : now,
		updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : now,
	};
}

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

let decksCache: FlashcardDeck[] | null = null;

function loadDecks(): FlashcardDeck[] {
	if (decksCache) {
		return decksCache;
	}

	const rawDecks: RawFlashcardDeck[] = [
		agileJson as RawFlashcardDeck,
		apiJson as RawFlashcardDeck,
		backendJson as RawFlashcardDeck,
		behavioralJson as RawFlashcardDeck,
		cssJson as RawFlashcardDeck,
		frontendJson as RawFlashcardDeck,
		gitJson as RawFlashcardDeck,
		nextjsJson as RawFlashcardDeck,
		systemDesignJson as RawFlashcardDeck,
		typescriptJson as RawFlashcardDeck,
		wcagJson as RawFlashcardDeck,
	];

	decksCache = rawDecks.map(transformRawDeck);
	return decksCache;
}

export function getAllDecks(): FlashcardDeck[] {
	return loadDecks();
}

export function getDeckById(id: string): FlashcardDeck | undefined {
	const decks = loadDecks();
	return decks.find((deck) => deck.id === id);
}

export function getDeckCategories(): FlashcardCategory[] {
	const decks = loadDecks();
	const categories = new Set<FlashcardCategory>();

	for (const deck of decks) {
		categories.add(deck.category);
	}

	return Array.from(categories).sort();
}

export function getDecksByCategory(
	category: FlashcardCategory,
): FlashcardDeck[] {
	const decks = loadDecks();
	return decks.filter((deck) => deck.category === category);
}

export function clearDecksCache(): void {
	decksCache = null;
}