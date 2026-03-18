import type { FlashcardDeck } from "@/types/flashcard";
import {
	getAllDecks as loadAllDecks,
	getDeckById as loadDeckById,
} from "./deck-loader";

export interface Card {
	id: string;
	question: string;
	answer: string;
	category: string;
	difficulty: "easy" | "medium" | "hard";
}

export interface Deck {
	id: string;
	title: string;
	description: string;
	cardCount: number;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	category: string;
	cards: Card[];
}

/**
 * Maps a FlashcardDeck (JSON-backed) to the legacy Deck interface
 * used by the current UI components.
 */
function mapToLegacyDeck(deck: FlashcardDeck): Deck {
	// Map difficulty based on some logic or default to Intermediate
	// In the JSON we have difficulty per card, but the Deck interface expects it per deck.
	// We'll calculate an overall difficulty or use a default.
	const difficultyWeights = { easy: 1, medium: 2, hard: 3 };
	const totalWeight = deck.cards.reduce(
		(sum, card) => sum + difficultyWeights[card.difficulty || "medium"],
		0,
	);
	const avgWeight = totalWeight / (deck.cards.length || 1);

	let overallDifficulty: "Beginner" | "Intermediate" | "Advanced" =
		"Intermediate";

	if (avgWeight <= 1.4) {
		overallDifficulty = "Beginner";
	} else if (avgWeight > 2.2) {
		overallDifficulty = "Advanced";
	}

	return {
		id: deck.id,
		title: deck.name,
		description: deck.description,
		cardCount: deck.cardCount,
		difficulty: overallDifficulty,
		category: deck.category,
		cards: deck.cards.map((card) => ({
			id: card.id,
			question: card.question,
			answer: card.answer,
			category: card.category,
			difficulty: card.difficulty,
		})),
	};
}

export function getDeckById(id: string): Deck | undefined {
	const deck = loadDeckById(id);
	return deck ? mapToLegacyDeck(deck) : undefined;
}

export function getAllDecks(): Omit<Deck, "cards">[] {
	const decks = loadAllDecks();
	return decks.map((deck) => {
		const legacy = mapToLegacyDeck(deck);
		const { cards, ...deckInfo } = legacy;
		return deckInfo;
	});
}
