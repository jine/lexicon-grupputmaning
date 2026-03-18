// Generate comprehensive flashcards based on extracted content
const fs = require("fs");

// Read the extracted content
const content = JSON.parse(
	fs.readFileSync("src/data/extracted/extracted-content.json", "utf8"),
);

// Generate flashcards for Next.js/React
const nextjsFlashcards = [
	{
		id: "nextjs-001",
		question: "Vad är Next.js?",
		answer:
			"Next.js är ett React-ramverk för att bygga webbapplikationer med server-side rendering, statisk generering och client-side rendering.",
		category: "frontend",
		difficulty: "easy",
		tags: ["nextjs", "react", "framework"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "nextjs-002",
		question:
			"Vad är skillnaden mellan Server Components och Client Components i Next.js?",
		answer:
			"Server Components körs på servern och är lämpliga för datahämtning och SEO. Client Components körs i webbläsaren och är nödvändiga för interaktivitet och state management.",
		category: "frontend",
		difficulty: "medium",
		tags: ["nextjs", "server-components", "client-components"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "nextjs-003",
		question: "Vad är en API Route i Next.js?",
		answer:
			"En API Route är ett endpoints i Next.js som låter dig skapa egna API:er genom att skapa filer i /app/api-mappen. Dessa kan hantera HTTP förfrågningar och svar.",
		category: "frontend",
		difficulty: "medium",
		tags: ["nextjs", "api", "routes"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "nextjs-004",
		question: "Vad är useActionState i React?",
		answer:
			"useActionState är en hook som låter hantera form-state i server actions. Den returnerar state, en form action och pending status.",
		category: "frontend",
		difficulty: "hard",
		tags: ["react", "hooks", "forms"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "nextjs-005",
		question: "Vad är useFormStatus i React?",
		answer:
			"useFormStatus är en hook som låter en komponent veta om en formulärinlämnings process pågår. Den returnerar pending status.",
		category: "frontend",
		difficulty: "medium",
		tags: ["react", "hooks", "forms"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Generate flashcards for Agile/Scrum
const agileFlashcards = [
	{
		id: "agile-001",
		question: "Vad är Scrum?",
		answer:
			"Scrum är ett agilt ramverk där team arbetar i korta iterationer kallade sprintar för att leverera produktinkrement.",
		category: "behavioral",
		difficulty: "easy",
		tags: ["agile", "scrum", "methodology"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "agile-002",
		question: "Vad är en sprint review?",
		answer:
			"En sprint review är ett möte där teamet presenterar vad de har byggt under sprinten för stakeholders och får feedback.",
		category: "behavioral",
		difficulty: "easy",
		tags: ["agile", "scrum", "review"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "agile-003",
		question: "Vad är en retrospektiv?",
		answer:
			"En retrospektiv är ett möte där teamet reflekterar över hur de arbetade under sprinten och identifierar förbättringar för nästa sprint.",
		category: "behavioral",
		difficulty: "easy",
		tags: ["agile", "scrum", "retrospective"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "agile-004",
		question: "Vad är en produktbacklog?",
		answer:
			"En produktbacklog är en prioriterad lista av funktioner och krav för ett projekt, organiseras av product owner.",
		category: "behavioral",
		difficulty: "easy",
		tags: ["agile", "backlog", "planning"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "agile-005",
		question: "Vad är en user story?",
		answer:
			'En user story är en kort beskrivning av en funktion ur användarens perspektiv, oftast i formatet "Som [ användare ] vill jag [ handling ] för att [ värde ]".',
		category: "behavioral",
		difficulty: "easy",
		tags: ["agile", "user-story", "planning"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Generate flashcards for Git/GitHub
const gitFlashcards = [
	{
		id: "git-001",
		question: "Vad är en pull request?",
		answer:
			"En pull request är ett begäran att slå samman ändringar från en feature-branch till huvudgrenen, vanligtvis för kodgranskning.",
		category: "system-design",
		difficulty: "easy",
		tags: ["git", "github", "pull-request"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "git-002",
		question: "Vad är en merge conflict?",
		answer:
			"En merge conflict uppstår när två grenar har gjort ändringar på samma del av koden och Git inte automatiskt kan slå ihop dem.",
		category: "system-design",
		difficulty: "medium",
		tags: ["git", "merge", "conflict"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "git-003",
		question: "Vad är en feature branch?",
		answer:
			"En feature branch är en separat gren där utvecklare arbetar på nya funktioner innan de slås samman med huvudgrenen.",
		category: "system-design",
		difficulty: "easy",
		tags: ["git", "branch", "workflow"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "git-004",
		question: "Vad är git rebase?",
		answer:
			"Git rebase är ett sätt att flytta eller kombinera commits från en gren till en annan, vilket skapar en renare historik.",
		category: "system-design",
		difficulty: "hard",
		tags: ["git", "rebase", "history"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "git-005",
		question: "Vad är GitHub Projects?",
		answer:
			"GitHub Projects är ett verktyg för att organisera och spåra arbete med boards, issues och milestones.",
		category: "system-design",
		difficulty: "easy",
		tags: ["github", "projects", "planning"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Generate flashcards for APIs
const apiFlashcards = [
	{
		id: "api-001",
		question: "Vad är REST API?",
		answer:
			"REST (Representational State Transfer) är ett arkitekturmönster för API:er som använder HTTP-metoder (GET, POST, PUT, DELETE) för att manipulera resurser.",
		category: "backend",
		difficulty: "medium",
		tags: ["api", "rest", "backend"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "api-002",
		question: "Vad är GraphQL?",
		answer:
			"GraphQL är ett API-framställningsspråk som låter klienter specifikt begära den data de behöver, vilket minimerar over-fetching.",
		category: "backend",
		difficulty: "hard",
		tags: ["api", "graphql", "backend"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "api-003",
		question: "Vad är JSON Server?",
		answer:
			"JSON Server är ett verktyg för att skapa ett mock API med REST-gränssnitt från en JSON-fil, användbart för utveckling och test.",
		category: "backend",
		difficulty: "easy",
		tags: ["api", "json-server", "mock"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "api-004",
		question: "Vad är fetch i JavaScript?",
		answer:
			"fetch är ett API för att göra HTTP-förfrågningar från JavaScript. Det returnerar en Promise som löses med ett Response-objekt.",
		category: "backend",
		difficulty: "easy",
		tags: ["javascript", "fetch", "api"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "api-005",
		question: "Vad är FormData?",
		answer:
			"FormData är ett API för att konstruera nyckel/värde-par som kan skickas med XMLHttpRequest eller fetch, oftast för formulär.",
		category: "backend",
		difficulty: "medium",
		tags: ["javascript", "forms", "api"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Generate flashcards for CSS
const cssFlashcards = [
	{
		id: "css-001",
		question: "Vad är CSS Flexbox?",
		answer:
			"Flexbox är ett CSS-layoutsystem för att arrangera element i en container, entydigt eller multi-dimensionellt.",
		category: "frontend",
		difficulty: "easy",
		tags: ["css", "flexbox", "layout"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "css-002",
		question: "Vad är CSS Grid?",
		answer:
			"CSS Grid är ett layoutsystem för att skapa tvådimensionella rutnät med kolumner och rader.",
		category: "frontend",
		difficulty: "medium",
		tags: ["css", "grid", "layout"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "css-003",
		question: "Vad är Tailwind CSS?",
		answer:
			"Tailwind CSS är en CSS-ramverk med utility-first klasser som låter dig bygga anpassade design snabbt utan att skriva custom CSS.",
		category: "frontend",
		difficulty: "easy",
		tags: ["css", "tailwind", "framework"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "css-004",
		question: "Vad är responsive design?",
		answer:
			"Responsive design är en metod för att skapa webbplatser som fungerar bra på alla enheter genom att använda media queries och flexibla layouter.",
		category: "frontend",
		difficulty: "medium",
		tags: ["css", "responsive", "design"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "css-005",
		question: "Vad är CSS specificity?",
		answer:
			"CSS specificity bestämmer vilka regler som tillämpas när flera regler matchar samma element. Den baseras på selektortyper och vikter.",
		category: "frontend",
		difficulty: "hard",
		tags: ["css", "specificity", "selectors"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Combine all flashcards
const allFlashcards = [
	...nextjsFlashcards,
	...agileFlashcards,
	...gitFlashcards,
	...apiFlashcards,
	...cssFlashcards,
];

// Create decks
const decks = [
	{
		id: "deck-nextjs",
		name: "Next.js & React",
		description: "Flashcards om Next.js, React och modern frontend-utveckling",
		category: "frontend",
		cards: nextjsFlashcards,
		cardCount: nextjsFlashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-agile",
		name: "Agile & Scrum",
		description: "Flashcards om agila metoder, Scrum och projektledning",
		category: "behavioral",
		cards: agileFlashcards,
		cardCount: agileFlashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-git",
		name: "Git & GitHub",
		description: "Flashcards om versionshantering och samarbete",
		category: "system-design",
		cards: gitFlashcards,
		cardCount: gitFlashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-api",
		name: "API-utveckling",
		description: "Flashcards om API:er, REST och backend-utveckling",
		category: "backend",
		cards: apiFlashcards,
		cardCount: apiFlashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-css",
		name: "CSS & Styling",
		description: "Flashcards om CSS, layout och design",
		category: "frontend",
		cards: cssFlashcards,
		cardCount: cssFlashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Write decks to files
decks.forEach((deck) => {
	const filePath = `src/data/decks/${deck.id.replace("deck-", "")}.json`;
	fs.writeFileSync(filePath, JSON.stringify(deck, null, 2));
	console.log(`Created: ${filePath}`);
});

// Write all flashcards to a single file
fs.writeFileSync(
	"src/data/extracted/generated-flashcards.json",
	JSON.stringify(allFlashcards, null, 2),
);
console.log(`Total flashcards: ${allFlashcards.length}`);
console.log("Flashcards generation complete!");
