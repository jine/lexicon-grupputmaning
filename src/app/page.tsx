import Link from "next/link";
import { getAllDecks } from "@/lib/deck-loader";
import type { Difficulty, FlashcardDeck } from "@/types/flashcard";

// Helper function to determine deck difficulty from cards
function getDeckDifficultyLabel(
	cards: FlashcardDeck["cards"],
): "Beginner" | "Intermediate" | "Advanced" {
	if (cards.length === 0) return "Beginner";

	const difficultyCounts = cards.reduce(
		(acc, card) => {
			acc[card.difficulty] = (acc[card.difficulty] || 0) + 1;
			return acc;
		},
		{} as Record<Difficulty, number>,
	);

	// Determine overall difficulty based on majority
	if (difficultyCounts.hard > cards.length / 2) return "Advanced";
	if (difficultyCounts.medium > cards.length / 2) return "Intermediate";
	return "Beginner";
}

interface DeckSummary {
	id: string;
	name: string;
	description: string;
	cardCount: number;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	category: string;
}

function DeckCard({ deck }: { deck: DeckSummary }) {
	const difficultyColor = {
		Beginner: "text-[#00d4aa]",
		Intermediate: "text-[#ffa726]",
		Advanced: "text-[#ff6b9d]",
	}[deck.difficulty];

	return (
		<Link
			href={`/deck/${deck.id}`}
			className="block bg-[#1a1a1a] rounded border border-[#2a2a2a] p-4 hover:border-[#3a3a3a] hover:bg-[#1f1f1f] transition-colors cursor-pointer"
		>
			<div className="flex items-start justify-between mb-3">
				<h3 className="font-semibold text-[#f5f5f5]">{deck.name}</h3>
				<span className={`text-xs ${difficultyColor}`}>{deck.difficulty}</span>
			</div>
			<p className="text-sm text-[#888] mb-4">{deck.description}</p>
			<div className="flex items-center justify-between text-xs text-[#666]">
				<span>{deck.category}</span>
				<span>{deck.cardCount} cards</span>
			</div>
		</Link>
	);
}

export default function Home() {
	const decks = getAllDecks();

	// Transform FlashcardDeck to DeckSummary for display
	const deckSummaries: DeckSummary[] = decks.map((deck) => ({
		id: deck.id,
		name: deck.name,
		description: deck.description,
		cardCount: deck.cardCount,
		difficulty: getDeckDifficultyLabel(deck.cards),
		category: deck.category,
	}));

	return (
		<div className="max-w-5xl">
			<div className="mb-8">
				<h2 className="text-xl font-semibold text-[#f5f5f5] mb-2">
					Flashcard Decks
				</h2>
				<p className="text-sm text-[#888]">Select a deck to start studying</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{deckSummaries.map((deck) => (
					<DeckCard key={deck.id} deck={deck} />
				))}
			</div>

			<div className="mt-8 pt-6 border-t border-[#2a2a2a]">
				<h3 className="text-lg font-semibold text-[#f5f5f5] mb-4">
					Your Progress
				</h3>
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
