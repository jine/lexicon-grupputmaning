import { Flashcard } from "@/components/ui/flashcard"

export default function FlashcardsDemo() {
  const flashcards = [
    {
      id: "1",
      question: "What is the difference between interface and type in TypeScript?",
      answer: "Both can be used to describe the shape of an object but 'interface' can only describe an object shape and can be merged. 'type' can be an alias to primitives, unions, and tuples. Interfaces are generally preferred for object definitions.",
      category: "TypeScript",
      difficulty: "medium" as const
    },
    {
      id: "2",
      question: "Explain Closure in JavaScript.",
      answer: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.",
      category: "JavaScript",
      difficulty: "hard" as const
    },
    {
      id: "3",
      question: "What is the difference between useState and useRef in React?",
      answer: "useState triggers re-renders when updated, while useRef does not. useRef is for persisting values without causing re-renders, often used for DOM elements or storing mutable values.",
      category: "React",
      difficulty: "easy" as const
    }
  ]

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="flex w-full max-w-5xl flex-col items-center justify-center gap-8 py-12">
        <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-50">
          Flashcards Demo
        </h1>
        
        <p className="text-center text-zinc-600 dark:text-zinc-400 max-w-lg">
          Click on a flashcard to flip it and reveal the answer. Use keyboard navigation (Enter/Space) to flip cards.
        </p>
        
        <div className="flex flex-col gap-6 mt-4 w-full max-w-2xl">
          {flashcards.map((card) => (
            <Flashcard 
              key={card.id}
              question={card.question}
              answer={card.answer}
              category={card.category}
              difficulty={card.difficulty}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
