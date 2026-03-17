"use client";

import { useState } from "react";
import { FlashcardComponent } from "@/components/ui/flashcard";
import { getAllDecks } from "@/lib/deck-loader";
import type { FlashcardDeck } from "@/types/flashcard";

export default function FlashcardsDemo() {
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);
  const decks = getAllDecks();

  if (selectedDeck) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedDeck(null)}
          className="mb-6 flex items-center gap-2 text-[#888] hover:text-[#f5f5f5] transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Decks
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#f5f5f5] mb-2">
            {selectedDeck.name}
          </h2>
          <p className="text-[#888] mb-4">{selectedDeck.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#00d4aa]">{selectedDeck.cardCount} cards</span>
            <span className="text-[#666]">•</span>
            <span className="text-[#888] capitalize">{selectedDeck.category}</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {selectedDeck.cards.map((card, index) => (
            <div key={card.id} className="relative">
              <div className="absolute -left-8 top-4 text-[#666] text-sm font-medium">
                {index + 1}
              </div>
              <FlashcardComponent
                question={card.question}
                answer={card.answer}
                category={card.category}
                difficulty={card.difficulty}
                tags={card.tags}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#f5f5f5] mb-2">
          Flashcard Decks
        </h2>
        <p className="text-[#888]">
          Select a deck to start practicing. Each deck contains carefully curated
          interview questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {decks.map((deck) => (
          <button
            key={deck.id}
            onClick={() => setSelectedDeck(deck)}
            className="text-left bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 hover:border-[#3a3a3a] hover:bg-[#1f1f1f] transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-[#f5f5f5] group-hover:text-[#00d4aa] transition-colors">
                {deck.name}
              </h3>
              <span className="text-xs text-[#00d4aa] bg-[#00d4aa]/10 px-2 py-1 rounded-full">
                {deck.cardCount} cards
              </span>
            </div>

            <p className="text-sm text-[#888] mb-4 line-clamp-2">
              {deck.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#666] capitalize">
                {deck.category}
              </span>
              <svg
                className="w-4 h-4 text-[#666] group-hover:text-[#00d4aa] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <div className="pt-6 border-t border-[#2a2a2a]">
        <h3 className="text-lg font-semibold text-[#f5f5f5] mb-4">
          Deck Overview
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-4">
            <div className="text-2xl font-bold text-[#00d4aa]">{decks.length}</div>
            <div className="text-xs text-[#888]">Total Decks</div>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-4">
            <div className="text-2xl font-bold text-[#00d4aa]">
              {decks.reduce((acc, deck) => acc + deck.cardCount, 0)}
            </div>
            <div className="text-xs text-[#888]">Total Cards</div>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-4">
            <div className="text-2xl font-bold text-[#00d4aa]">
              {
                decks.filter((d) => d.category === "frontend")[0]?.cardCount ||
                  0
              }
            </div>
            <div className="text-xs text-[#888]">Frontend Cards</div>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-4">
            <div className="text-2xl font-bold text-[#00d4aa]">
              {
                decks.filter((d) => d.category === "backend")[0]?.cardCount ||
                  0
              }
            </div>
            <div className="text-xs text-[#888]">Backend Cards</div>
          </div>
        </div>
      </div>
    </div>
  );
}
