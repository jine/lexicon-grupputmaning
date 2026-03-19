"use client";

import { motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface FlashcardProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	question: string;
	answer: string;
	category?: string;
	difficulty?: "easy" | "medium" | "hard";
}

export function Flashcard({
	question,
	answer,
	category,
	difficulty,
	className,
	...props
}: FlashcardProps) {
	const [isFlipped, setIsFlipped] = React.useState(false);

	const difficultyColors = {
		easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
		medium:
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
		hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
	};

	return (
		<button
			type="button"
			className={cn(
				"relative w-full max-w-sm h-80 perspective-[1000px] block cursor-pointer text-left p-0 border-none bg-transparent",
				className,
			)}
			onClick={() => setIsFlipped(!isFlipped)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					setIsFlipped(!isFlipped);
				}
			}}
			aria-label={isFlipped ? "Show question" : "Show answer"}
			{...props}
		>
			<motion.div
				className="w-full h-full relative transform-3d"
				initial={false}
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{
					duration: 0.6,
					type: "spring",
					stiffness: 260,
					damping: 20,
				}}
			>
				{/* Front of the card */}
				<div className="absolute inset-0 backface-hidden w-full h-full bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center justify-between text-center overflow-hidden">
					<div className="w-full flex justify-between items-start">
						{category && (
							<span className="text-xs font-semibold px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
								{category}
							</span>
						)}
						{difficulty && (
							<span
								className={cn(
									"text-xs font-semibold px-2 py-1 rounded-full",
									difficultyColors[difficulty],
								)}
							>
								{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
							</span>
						)}
					</div>

					<div className="flex-1 flex items-center justify-center py-4">
						<h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 leading-relaxed max-w-[280px]">
							{question}
						</h3>
					</div>

					<div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mt-auto">
						<RotateCw className="w-4 h-4" aria-hidden="true" />
						<span>Click to flip</span>
					</div>
				</div>

				{/* Back of the card */}
				<div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] w-full h-full bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 p-6 flex flex-col items-center justify-center text-center overflow-hidden">
					<div className="w-full h-full flex flex-col items-center justify-between">
						<span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
							Answer
						</span>

						<div className="flex-1 flex items-center justify-center py-4 overflow-y-auto w-full">
							<p className="text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed w-full">
								{answer}
							</p>
						</div>
					</div>
				</div>
			</motion.div>
		</button>
	);
}
