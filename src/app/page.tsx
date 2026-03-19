"use client";

import {
	ArrowRight,
	BookOpen,
	Code2,
	Layout,
	Search,
	Server,
	Trophy,
	UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getAllDecks } from "@/lib/decks";
import { cn } from "@/lib/utils";

interface DeckSummary {
	id: string;
	title: string;
	description: string;
	cardCount: number;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	category: string;
}

const CATEGORIES = [
	{ id: "all", name: "All Decks", icon: BookOpen },
	{ id: "frontend", name: "Frontend", icon: Layout },
	{ id: "backend", name: "Backend", icon: Server },
	{ id: "system-design", name: "System Design", icon: Code2 },
	{ id: "behavioral", name: "Behavioral", icon: UserCircle },
];

function DeckCard({ deck }: { deck: DeckSummary }) {
	const difficultyColor = {
		Beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
		Intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
		Advanced: "text-rose-400 bg-rose-400/10 border-rose-400/20",
	}[deck.difficulty];

	const Icon = useMemo(() => {
		switch (deck.id) {
			case "frontend":
				return Layout;
			case "backend":
				return Server;
			case "system-design":
				return Code2;
			case "behavioral":
				return UserCircle;
			default:
				return BookOpen;
		}
	}, [deck.id]);

	return (
		<Link
			href={`/deck/${deck.id}`}
			className="group block relative bg-[#1a1a1a] rounded-xl border border-zinc-800 p-6 hover:border-emerald-500/50 hover:bg-[#1f1f1f] transition-all duration-300 overflow-hidden"
		>
			{/* Background Gradient Effect */}
			<div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-emerald-500/5 blur-[80px] group-hover:bg-emerald-500/10 transition-colors" />

			<div className="relative flex items-start justify-between mb-4">
				<div className="p-2.5 bg-zinc-800/50 rounded-lg group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all duration-300">
					<Icon className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400" />
				</div>
				<span
					className={cn(
						"text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border",
						difficultyColor,
					)}
				>
					{deck.difficulty}
				</span>
			</div>

			<h3 className="text-lg font-bold text-zinc-100 group-hover:text-white mb-2 transition-colors">
				{deck.title}
			</h3>
			<p className="text-sm text-zinc-400 line-clamp-2 mb-6 min-h-[40px]">
				{deck.description}
			</p>

			<div className="flex items-center justify-between mt-auto">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-1.5 text-xs text-zinc-500">
						<BookOpen className="w-3.5 h-3.5" />
						<span>{deck.cardCount} cards</span>
					</div>
					<div className="text-[10px] text-zinc-600 font-medium px-2 py-0.5 bg-zinc-800/30 rounded uppercase tracking-tight">
						{deck.category}
					</div>
				</div>
				<ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
			</div>
		</Link>
	);
}

export default function Home() {
	const allDecks = useMemo(() => getAllDecks() as DeckSummary[], []);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredDecks = useMemo(() => {
		return allDecks.filter((deck) => {
			const matchesCategory =
				selectedCategory === "all" || deck.category === selectedCategory;
			const matchesSearch =
				deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				deck.description.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		});
	}, [allDecks, selectedCategory, searchQuery]);

	return (
		<div className="max-w-6xl mx-auto space-y-10">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div className="space-y-2">
					<div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
						New Content Available
					</div>
					<h2 className="text-3xl font-bold text-white tracking-tight">
						Explore Decks
					</h2>
					<p className="text-zinc-400 max-w-md">
						Master the most frequent interview questions with our curated
						flashcard collections.
					</p>
				</div>

				{/* Search Bar */}
				<div className="relative group w-full md:w-72">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
					<input
						type="text"
						placeholder="Search decks..."
						className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			{/* Category Tabs */}
			<div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
				{CATEGORIES.map((cat) => {
					const Icon = cat.icon;
					const isActive = selectedCategory === cat.id;
					return (
						<button
							type="button"
							key={cat.id}
							onClick={() => setSelectedCategory(cat.id)}
							className={cn(
								"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
								isActive
									? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
									: "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800",
							)}
						>
							<Icon
								className={cn(
									"w-4 h-4",
									isActive ? "text-black" : "text-zinc-500",
								)}
							/>
							{cat.name}
						</button>
					);
				})}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredDecks.length > 0 ? (
					filteredDecks.map((deck) => <DeckCard key={deck.id} deck={deck} />)
				) : (
					<div className="col-span-full py-20 text-center space-y-4">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800">
							<Search className="w-8 h-8 text-zinc-700" />
						</div>
						<div className="space-y-1">
							<p className="text-zinc-300 font-medium">No decks found</p>
							<p className="text-sm text-zinc-500">
								Try adjusting your search or category filters.
							</p>
						</div>
					</div>
				)}
			</div>

			<div className="pt-10 border-t border-zinc-800">
				<div className="flex items-center justify-between mb-8">
					<div className="space-y-1">
						<h3 className="text-xl font-bold text-white tracking-tight">
							Your Learning Stats
						</h3>
						<p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
							Weekly Overview
						</p>
					</div>
					<button
						type="button"
						className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
					>
						View detailed report
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<StatCard
						icon={Trophy}
						label="Day Streak"
						value="12"
						subValue="+2 today"
					/>
					<StatCard
						icon={BookOpen}
						label="Cards Reviewed"
						value="847"
						subValue="Top 5%"
					/>
					<StatCard
						icon={Layout}
						label="Avg Mastery"
						value="4.8"
						subValue="/ 5.0"
					/>
					<StatCard
						icon={Trophy}
						label="Retention Rate"
						value="92%"
						subValue="Elite"
					/>
				</div>
			</div>
		</div>
	);
}

function StatCard({
	icon: Icon,
	label,
	value,
	subValue,
}: {
	icon: React.ElementType;
	label: string;
	value: string;
	subValue: string;
}) {
	return (
		<div className="group bg-[#1a1a1a] rounded-xl border border-zinc-800 p-5 hover:bg-[#1f1f1f] transition-all duration-300">
			<div className="flex items-start justify-between">
				<div className="space-y-3">
					<div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
						<Icon className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400" />
					</div>
					<div className="space-y-1">
						<div className="text-sm text-zinc-500 font-medium">{label}</div>
						<div className="flex items-baseline gap-2">
							<div className="text-2xl font-bold text-white">{value}</div>
							<div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded leading-none">
								{subValue}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}