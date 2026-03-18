import { notFound } from "next/navigation";
import { getDeckById } from "@/lib/decks";
import { DeckStudyPage } from "./deck-study-page";

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

	return <DeckStudyPage deck={deck} />;
}
