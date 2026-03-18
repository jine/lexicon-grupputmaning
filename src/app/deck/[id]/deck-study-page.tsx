"use client";

import { ArrowLeft, ArrowRight, BookOpen, Layers } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Flashcard } from "@/components/ui/flashcard";
import type { Difficulty, FlashcardDeck } from "@/types/flashcard";

interface DeckStudyPageProps {
	deck: FlashcardDeck;
}

// Map card difficulty to deck difficulty display
function getDeckDifficultyLabel(cards: FlashcardDeck["cards"]): string {
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

export function DeckStudyPage({ deck }: DeckStudyPageProps) {
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	const deckDifficulty = getDeckDifficultyLabel(deck.cards);

	const difficultyColor = {
		Beginner: "text-green-400",
		Intermediate: "text-yellow-400",
		Advanced: "text-red-400",
	}[deckDifficulty];

	const scrollToCard = useCallback(
		(index: number) => {
			if (index >= 0 && index < deck.cards.length) {
				const cardElement = cardRefs.current[index];
				if (cardElement) {
					cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
					setCurrentCardIndex(index);
				}
			}
		},
		[deck.cards.length],
	);

	const goToNextCard = useCallback(() => {
		if (currentCardIndex < deck.cards.length - 1) {
			scrollToCard(currentCardIndex + 1);
		}
	}, [currentCardIndex, deck.cards.length, scrollToCard]);

	const goToPreviousCard = useCallback(() => {
		if (currentCardIndex > 0) {
			scrollToCard(currentCardIndex - 1);
		}
	}, [currentCardIndex, scrollToCard]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
				e.preventDefault();
				goToNextCard();
			} else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
				e.preventDefault();
				goToPreviousCard();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [goToNextCard, goToPreviousCard]);

	return (
		<div className="h-screen flex flex-col bg-[#0f0f0f]">
			{/* Fixed Header */}
			<div className="flex-none px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-zinc-800 bg-[#0f0f0f]">
				{/* Back Navigation */}
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-3 sm:mb-4"
				>
					<ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
					Back to Decks
				</Link>

				{/* Deck Info */}
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
					<div className="flex items-center gap-2 sm:gap-4">
						<div>
							<h1 className="text-lg sm:text-xl font-semibold text-zinc-50">
								{deck.name}
							</h1>
							<div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs sm:text-sm text-zinc-500">
								<div className="flex items-center gap-1">
									<Layers className="w-3 h-3 sm:w-4 sm:h-4" />
									<span>{deck.category}</span>
								</div>
								<div className="flex items-center gap-1">
									<BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
									<span>
										{currentCardIndex + 1} / {deck.cards.length}
									</span>
								</div>
							</div>
						</div>
					</div>
					<span className={`text-xs sm:text-sm font-medium ${difficultyColor}`}>
						{deckDifficulty}
					</span>
				</div>

				{/* Progress Bar */}
				<div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
					<div className="flex-1 h-1.5 sm:h-2 bg-zinc-800 rounded-full overflow-hidden">
						<div
							className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
							style={{
								width: `${((currentCardIndex + 1) / deck.cards.length) * 100}%`,
							}}
						/>
					</div>
					<span className="text-xs sm:text-sm text-zinc-500 min-w-[2.5rem] sm:min-w-[3rem] text-right">
						{Math.round(((currentCardIndex + 1) / deck.cards.length) * 100)}%
					</span>
				</div>
			</div>

			{/* Scrollable Cards Container */}
			<div
				ref={containerRef}
				className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth"
				style={{ scrollPaddingTop: "0px" }}
			>
				<div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
					{deck.cards.map((card, index) => (
						<div
							key={card.id}
							ref={(el) => {
								cardRefs.current[index] = el;
							}}
							className="snap-start min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)] flex flex-col justify-center py-4 sm:py-8"
						>
							{/* Card Number */}
							<div className="text-center mb-4 sm:mb-6">
								<span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-zinc-800 border border-zinc-700 rounded-full text-xs sm:text-sm font-medium text-zinc-400">
									{index + 1}
								</span>
							</div>

							{/* Flashcard */}
							<div className="flex justify-center px-2 sm:px-0">
								<Flashcard
									question={card.question}
									answer={card.answer}
									category={card.category}
									difficulty={card.difficulty}
									className="h-[50vh] sm:h-[60vh] max-w-2xl w-full"
								/>
							</div>

							{/* Card Navigation Hint */}
							<div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-zinc-600">
								{index < deck.cards.length - 1 ? (
									<span>Scroll down or press Space/↓ for next card</span>
								) : (
									<span className="text-emerald-500">
										✓ You&apos;ve reached the end of this deck
									</span>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Fixed Footer Navigation */}
			<div className="flex-none px-4 sm:px-6 py-3 sm:py-4 border-t border-zinc-800 bg-[#0f0f0f] flex items-center justify-between gap-2 sm:gap-0">
				<button
					type="button"
					onClick={goToPreviousCard}
					disabled={currentCardIndex === 0}
					className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-lg hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
				>
					<ArrowLeft className="w-4 h-4" />
					<span className="hidden sm:inline">Previous</span>
				</button>

				<div className="text-xs sm:text-sm text-zinc-500 whitespace-nowrap">
					Card {currentCardIndex + 1} / {deck.cards.length}
				</div>

				<button
					type="button"
					onClick={goToNextCard}
					disabled={currentCardIndex === deck.cards.length - 1}
					className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 text-sm font-medium text-zinc-900 bg-emerald-400 rounded-lg hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
				>
					<span className="hidden sm:inline">Next</span>
					<ArrowRight className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
}
