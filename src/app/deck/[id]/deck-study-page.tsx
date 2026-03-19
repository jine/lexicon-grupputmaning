"use client";

import {
	ArrowLeft,
	ArrowRight,
	CheckCircle2,
	Home as HomeIcon,
	Layers,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Flashcard } from "@/components/ui/flashcard";
import type { Deck } from "@/lib/decks";
import { cn } from "@/lib/utils";

interface DeckStudyPageProps {
	deck: Deck;
}

export function DeckStudyPage({ deck }: DeckStudyPageProps) {
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [isFinished, setIsFinished] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	const difficultyColor = {
		Beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
		Intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
		Advanced: "text-rose-400 bg-rose-400/10 border-rose-400/20",
	}[deck.difficulty];

	const scrollToCard = useCallback(
		(index: number) => {
			if (index >= 0 && index < deck.cards.length) {
				const cardElement = cardRefs.current[index];
				if (cardElement) {
					cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
					setCurrentCardIndex(index);
					if (index === deck.cards.length - 1) {
						// Small delay before showing finished state if needed,
						// or just let the user see the last card.
					}
				}
			}
		},
		[deck.cards.length],
	);

	const goToNextCard = useCallback(() => {
		if (currentCardIndex < deck.cards.length - 1) {
			scrollToCard(currentCardIndex + 1);
		} else {
			setIsFinished(true);
		}
	}, [currentCardIndex, deck.cards.length, scrollToCard]);

	const goToPreviousCard = useCallback(() => {
		if (currentCardIndex > 0) {
			setIsFinished(false);
			scrollToCard(currentCardIndex - 1);
		}
	}, [currentCardIndex, scrollToCard]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Ignore if event was already handled
			if (e.defaultPrevented) return;

			// Ignore if modifier keys are held
			if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

			// Check if the target is an interactive element
			const target = e.target as HTMLElement;
			const interactiveSelectors = [
				"button",
				'[role="button"]',
				"a[href]",
				"input",
				"textarea",
				"select",
				"[contenteditable]",
			];

			// Check if target or any element in composedPath is interactive
			const path = e.composedPath() as HTMLElement[];
			const isInteractive = path.some((element) => {
				if (!element.matches) return false;
				return interactiveSelectors.some((selector) => {
					try {
						return element.matches(selector);
					} catch {
						return false;
					}
				});
			});

			if (isInteractive) return;

			// Now handle the keyboard navigation
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

	useEffect(() => {
		const observers: IntersectionObserver[] = [];

		cardRefs.current.forEach((cardEl, index) => {
			if (!cardEl) return;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
							setCurrentCardIndex(index);
						}
					});
				},
				{ threshold: 0.5 },
			);

			observer.observe(cardEl);
			observers.push(observer);
		});

		return () => {
			for (const observer of observers) {
				observer.disconnect();
			}
		};
	}, []);

	if (isFinished) {
		return (
			<div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
				<div className="relative">
					<div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 rounded-full animate-pulse" />
					<div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
						<CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
						<h2 className="text-3xl font-bold text-white mb-2">
							Deck Completed!
						</h2>
						<p className="text-zinc-400 max-w-sm mx-auto">
							Great job! You&apos;ve reviewed all {deck.cards.length} cards in
							the{" "}
							<span className="text-emerald-400 font-semibold">
								{deck.title}
							</span>{" "}
							deck.
						</p>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-4">
					<button
						type="button"
						onClick={() => {
							setIsFinished(false);
							setCurrentCardIndex(0);
							scrollToCard(0);
						}}
						className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 text-white rounded-xl font-semibold hover:bg-zinc-700 transition-all border border-zinc-700"
					>
						<Layers className="w-5 h-5" />
						Review Again
					</button>
					<Link
						href="/"
						className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-black rounded-xl font-semibold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
					>
						<HomeIcon className="w-5 h-5" />
						Back to Library
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="h-screen flex flex-col bg-[#0f0f0f]">
			{/* Fixed Header */}
			<div className="flex-none px-6 pt-6 pb-6 border-b border-zinc-800/50 bg-[#0f0f0f]/80 backdrop-blur-xl sticky top-0 z-10">
				<div className="max-w-4xl mx-auto flex flex-col gap-6">
					<div className="flex items-center justify-between">
						<div>
							<Link
								href="/"
								className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-2"
							>
								<ArrowLeft className="w-3 h-3" />
								Back to Library
							</Link>
							<h1 className="text-2xl font-bold text-white tracking-tight">
								{deck.title}
							</h1>
						</div>
						<div
							className={cn(
								"px-3 py-1 rounded-full text-xs font-bold border",
								difficultyColor,
							)}
						>
							{deck.difficulty}
						</div>
					</div>

					{/* Progress & Stats */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
						<div className="space-y-2">
							<div className="flex justify-between text-xs font-medium">
								<span className="text-zinc-500">Progress</span>
								<span className="text-emerald-400">
									{Math.round(
										((currentCardIndex + 1) / deck.cards.length) * 100,
									)}
									%
								</span>
							</div>
							<div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
								<div
									className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500 ease-out"
									style={{
										width: `${((currentCardIndex + 1) / deck.cards.length) * 100}%`,
									}}
								/>
							</div>
						</div>

						<div className="flex items-center justify-end gap-6">
							<div className="flex flex-col items-end">
								<span className="text-[10px] uppercase tracking-wider font-bold text-zinc-600">
									Category
								</span>
								<span className="text-sm font-semibold text-zinc-300">
									{deck.category}
								</span>
							</div>
							<div className="flex flex-col items-end">
								<span className="text-[10px] uppercase tracking-wider font-bold text-zinc-600">
									Card
								</span>
								<span className="text-sm font-semibold text-emerald-400">
									{currentCardIndex + 1} / {deck.cards.length}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Scrollable Cards Container */}
			<div
				ref={containerRef}
				className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-hide py-12"
			>
				<div className="max-w-2xl mx-auto px-6">
					{deck.cards.map((card, index) => (
						<div
							key={card.id}
							ref={(el) => {
								cardRefs.current[index] = el;
							}}
							className="snap-start min-h-[calc(100vh-280px)] flex flex-col justify-start pt-12"
						>
							{/* Card Header Hint */}
							<div className="flex items-center justify-between mb-8">
								<div className="h-px flex-1 bg-linear-to-r from-transparent to-zinc-800" />
								<span className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
									Question {index + 1}
								</span>
								<div className="h-px flex-1 bg-linear-to-l from-transparent to-zinc-800" />
							</div>

							<div className="flex justify-center">
								<Flashcard
									question={card.question}
									answer={card.answer}
									category={card.category}
									difficulty={card.difficulty}
									className="h-[55vh] w-full"
								/>
							</div>

							<div className="text-center mt-10">
								{index < deck.cards.length - 1 ? (
									<button
										type="button"
										onClick={() => scrollToCard(index + 1)}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault();
												scrollToCard(index + 1);
											}
										}}
										className="inline-flex items-center gap-2 text-zinc-600 text-xs animate-bounce group cursor-pointer"
									>
										<span>Next card</span>
										<ArrowRight className="w-3 h-3 group-hover:text-emerald-500 transition-colors" />
									</button>
								) : (
									<button
										type="button"
										onClick={() => setIsFinished(true)}
										className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all"
									>
										Finish Session
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Bottom Navigation Bar */}
			<div className="flex-none bg-zinc-900/50 backdrop-blur-lg border-t border-zinc-800 p-4">
				<div className="max-w-4xl mx-auto flex items-center justify-between">
					<button
						type="button"
						onClick={goToPreviousCard}
						disabled={currentCardIndex === 0}
						className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-all"
					>
						<ArrowLeft className="w-4 h-4" />
						Prev
					</button>

					<div className="flex gap-1.5">
						{deck.cards.slice(0, 10).map((card, i) => (
							<div
								key={card.id}
								className={cn(
									"w-1.5 h-1.5 rounded-full transition-all duration-300",
									i === currentCardIndex ? "bg-emerald-500 w-4" : "bg-zinc-800",
								)}
							/>
						))}
					</div>

					<button
						type="button"
						onClick={goToNextCard}
						className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-all"
					>
						{currentCardIndex === deck.cards.length - 1 ? "Finish" : "Next"}
						<ArrowRight className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
}