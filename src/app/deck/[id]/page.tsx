import { ArrowLeft, BookOpen, Layers } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Flashcard } from "@/components/ui/flashcard";
import { getDeckById } from "@/lib/decks";

interface DeckPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function DeckPage({ params }: DeckPageProps) {
	const { id } = await params;
	const deck = getDeckById(id);

	if (!deck) {
		notFound();
	}

	const difficultyColor = {
		Beginner: "text-green-400",
		Intermediate: "text-yellow-400",
		Advanced: "text-red-400",
	}[deck.difficulty];

	return (
		<div className="max-w-5xl">
			{/* Back Navigation */}
			<Link
				href="/"
				className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-6"
			>
				<ArrowLeft className="w-4 h-4" />
				Back to Decks
			</Link>

			{/* Deck Header */}
			<div className="mb-8">
				<div className="flex items-start justify-between mb-4">
					<div>
						<h1 className="text-2xl font-semibold text-zinc-50 mb-2">
							{deck.title}
						</h1>
						<p className="text-zinc-400 max-w-2xl">{deck.description}</p>
					</div>
					<span className={`text-sm font-medium ${difficultyColor}`}>
						{deck.difficulty}
					</span>
				</div>

				<div className="flex items-center gap-6 text-sm text-zinc-500">
					<div className="flex items-center gap-2">
						<Layers className="w-4 h-4" />
						<span>{deck.category}</span>
					</div>
					<div className="flex items-center gap-2">
						<BookOpen className="w-4 h-4" />
						<span>{deck.cards.length} cards</span>
					</div>
				</div>
			</div>

			{/* Cards Section */}
			<div className="space-y-6">
				<h2 className="text-lg font-medium text-zinc-200">Study Cards</h2>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{deck.cards.map((card, index) => (
						<div key={card.id} className="relative">
							<div className="absolute -top-3 -left-3 w-8 h-8 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-sm font-medium text-zinc-400 z-10">
								{index + 1}
							</div>
							<Flashcard
								question={card.question}
								answer={card.answer}
								category={card.category}
								difficulty={card.difficulty}
								className="h-72"
							/>
						</div>
					))}
				</div>
			</div>

			{/* Progress indicator */}
			<div className="mt-12 pt-6 border-t border-zinc-800">
				<div className="flex items-center justify-between text-sm text-zinc-500">
					<span>Progress</span>
					<span>0 / {deck.cards.length} cards studied</span>
				</div>
				<div className="mt-2 h-2 bg-zinc-800 rounded-full overflow-hidden">
					<div className="h-full w-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" />
				</div>
			</div>
		</div>
	);
}
