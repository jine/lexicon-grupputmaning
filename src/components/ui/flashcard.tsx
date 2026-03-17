"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FlashcardComponentProps {
  question: string;
  answer: string;
  category?: string;
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
}

export function FlashcardComponent({
  question,
  answer,
  category,
  difficulty,
  tags,
}: FlashcardComponentProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const difficultyColor = {
    easy: "text-[#00d4aa] bg-[#00d4aa]/10",
    medium: "text-[#ffa726] bg-[#ffa726]/10",
    hard: "text-[#ff6b9d] bg-[#ff6b9d]/10",
  };

  return (
    <div
      className="w-full cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsFlipped(!isFlipped);
        }
      }}
      aria-label={isFlipped ? "Show question" : "Show answer"}
    >
      <div
        className={cn(
          "relative w-full min-h-[280px] transition-transform duration-500 transform-style-preserve-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 w-full h-full bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 flex flex-col backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-center justify-between mb-4">
            {category && (
              <span className="text-xs text-[#888] uppercase tracking-wider">
                {category}
              </span>
            )}
            {difficulty && (
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full capitalize",
                  difficultyColor[difficulty]
                )}
              >
                {difficulty}
              </span>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-lg font-semibold text-[#f5f5f5] text-center leading-relaxed">
              {question}
            </h3>
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#666] bg-[#2a2a2a] px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 text-center">
            <span className="text-xs text-[#666]">Click to flip</span>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 flex flex-col rotate-y-180 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-[#888] uppercase tracking-wider">
              Answer
            </span>
            {difficulty && (
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full capitalize",
                  difficultyColor[difficulty]
                )}
              >
                {difficulty}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            <p className="text-[#f5f5f5] leading-relaxed">{answer}</p>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs text-[#666]">Click to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
