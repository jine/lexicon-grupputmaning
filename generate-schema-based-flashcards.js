// Generate flashcards based on schema-vecka content
const fs = require("fs");

// Read the extracted content
const content = JSON.parse(
	fs.readFileSync("src/data/extracted/extracted-content.json", "utf8"),
);

// Helper function to generate unique IDs
let idCounter = 0;
function generateId(prefix) {
	idCounter++;
	return `${prefix}-${String(idCounter).padStart(3, "0")}`;
}

// Extract flashcards from schema-vecka-9 (CRUD med Next.js)
const schema9Flashcards = [
	{
		id: generateId("nextjs"),
		question: "Vad är CRUD?",
		answer:
			"CRUD står för Create, Read, Update, Delete - de fyra grundläggande operationerna för att manipulera data.",
		category: "backend",
		difficulty: "easy",
		tags: ["crud", "database", "api"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: "Vad är en server action i Next.js?",
		answer:
			"En server action är en funktion som körs på servern och kan anropas från klienten, ofta från formulär eller knappar.",
		category: "frontend",
		difficulty: "medium",
		tags: ["nextjs", "server-actions", "forms"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: "Vad är useActionState?",
		answer:
			"useActionState är en React hook för att hantera form-state i server actions, inklusive pending status och error handling.",
		category: "frontend",
		difficulty: "hard",
		tags: ["react", "hooks", "forms"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: "Vad är useFormStatus?",
		answer:
			"useFormStatus är en hook som låter en komponent veta om en formulärinlämningsprocess pågår.",
		category: "frontend",
		difficulty: "medium",
		tags: ["react", "hooks", "forms"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: "Vad är FormData?",
		answer:
			"FormData är ett API för att konstruera nyckel/värde-par från formulär som kan skickas till servern.",
		category: "backend",
		difficulty: "easy",
		tags: ["javascript", "forms", "api"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: "Vad är revalidatePath?",
		answer:
			"revalidatePath är en funktion för att invalidera cache och tvinga om rendering av en specifik path efter dataändringar.",
		category: "frontend",
		difficulty: "medium",
		tags: ["nextjs", "cache", "revalidation"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Extract flashcards from schema-vecka-8 (Agila Metoder & Git-Flow)
const schema8Flashcards = [
	{
		id: generateId("agile"),
		question: "Vad är Git-Flow?",
		answer:
			"Git-Flow är ett grenstrategimönster som definierar specifika grenar för feature, release, hotfix och master/main.",
		category: "system-design",
		difficulty: "medium",
		tags: ["git", "workflow", "branching"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("agile"),
		question: "Vad är en working agreement?",
		answer:
			"En working agreement är ett sett av regler och normer som teamet gemensamt skapar för hur de ska arbeta tillsammans.",
		category: "behavioral",
		difficulty: "easy",
		tags: ["agile", "teamwork", "collaboration"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("agile"),
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
	{
		id: generateId("agile"),
		question: "Vad är agila värderingar?",
		answer:
			"Agila värderingar inkluderar individer framför processer, samarbete över kontrakt, fungerande mjukvara över dokumentation och responsivitet över följsamhet.",
		category: "behavioral",
		difficulty: "easy",
		tags: ["agile", "values", "principles"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("agile"),
		question: "Vad är en issue i GitHub?",
		answer:
			"En issue är ett ärende eller uppgift i GitHub som kan användas för att spåra arbete, buggar eller förbättringar.",
		category: "system-design",
		difficulty: "easy",
		tags: ["github", "issues", "tracking"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Extract flashcards from schema-vecka-7 (Interaktivitet & Arkitektur)
const schema7Flashcards = [
	{
		id: generateId("nextjs"),
		question: "Vad är Server Components?",
		answer:
			"Server Components körs på servern och är lämpliga för datahämtning och SEO, med minimal JavaScript-bördor på klienten.",
		category: "frontend",
		difficulty: "medium",
		tags: ["nextjs", "server-components", "architecture"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: "Vad är Client Components?",
		answer:
			"Client Components körs i webbläsaren och är nödvändiga för interaktivitet, state management och event handlers.",
		category: "frontend",
		difficulty: "medium",
		tags: ["nextjs", "client-components", "react"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: "Vad är en API Route?",
		answer:
			"En API Route är ett endpoint i Next.js som låter dig skapa egna API:er genom att skapa filer i /app/api-mappen.",
		category: "backend",
		difficulty: "medium",
		tags: ["nextjs", "api", "routes"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: "Vad är useState hook?",
		answer:
			"useState är en React hook för att hantera state i komponenter, vilket låter dig spara och uppdatera data.",
		category: "frontend",
		difficulty: "easy",
		tags: ["react", "hooks", "state"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: 'Vad är "Use Client" direktiv?',
		answer:
			'"Use Client" är ett direktiv som markerar en komponent som en Client Component i Next.js App Router.',
		category: "frontend",
		difficulty: "easy",
		tags: ["nextjs", "directives", "client-components"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Extract flashcards from schema-vecka-6 (API:er)
const schema6Flashcards = [
	{
		id: generateId("api"),
		question: "Vad är REST API?",
		answer:
			"REST (Representational State Transfer) är ett arkitekturmönster för API:er som använder HTTP-metoder för att manipulera resurser.",
		category: "backend",
		difficulty: "medium",
		tags: ["api", "rest", "backend"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("api"),
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
		id: generateId("api"),
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
		id: generateId("api"),
		question: "Vad är en async funktion?",
		answer:
			"En async funktion är en funktion som alltid returnerar en Promise och låter dig använda await för att vänta på asynkrona operationer.",
		category: "backend",
		difficulty: "medium",
		tags: ["javascript", "async", "promises"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("api"),
		question: "Vad är felhantering med try/catch?",
		answer:
			"try/catch är ett sätt att hantera fel i JavaScript-kod, där kod i try-blocket körs och catch-blocket körs om ett fel uppstår.",
		category: "backend",
		difficulty: "easy",
		tags: ["javascript", "error-handling", "try-catch"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Extract flashcards from schema-vecka-5 (Next.js grundläggning)
const schema5Flashcards = [
	{
		id: generateId("nextjs"),
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
		id: generateId("nextjs"),
		question: "Vad är App Router?",
		answer:
			"App Router är ett routing-system i Next.js baserat på mappstruktur i /app-katalogen, med stöd för layouts, pages och routes.",
		category: "frontend",
		difficulty: "medium",
		tags: ["nextjs", "routing", "app-router"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: "Vad är en layout i Next.js?",
		answer:
			"En layout är en komponent som omger sidor och delar UI mellan olika sidor, ofta med gemensam navigation och footer.",
		category: "frontend",
		difficulty: "easy",
		tags: ["nextjs", "layout", "components"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: "Vad är Tailwind CSS?",
		answer:
			"Tailwind CSS är utility-first CSS ramverk som låter dig bygga anpassade design snabbt med hjälp av fördefinierade klasser.",
		category: "frontend",
		difficulty: "easy",
		tags: ["css", "tailwind", "styling"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("nextjs"),
		question: "Vad är en React komponent?",
		answer:
			"En React komponent är en återanvändbar enhet av UI som kan innehålla state och logik, antingen som en funktion eller klass.",
		category: "frontend",
		difficulty: "easy",
		tags: ["react", "components", "ui"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Extract flashcards from schema-vecka-4 (TypeScript)
const schema4Flashcards = [
	{
		id: generateId("typescript"),
		question: "Vad är TypeScript?",
		answer:
			"TypeScript är ett programmeringsspråk som bygger på JavaScript och lägger till statisk typning för bättre kodkvalitet.",
		category: "backend",
		difficulty: "easy",
		tags: ["typescript", "javascript", "programming"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är ett interface i TypeScript?",
		answer:
			"Ett interface definierar strukturen av ett objekt, vilket låter dig beskriva vilka properties och metoder ett objekt ska ha.",
		category: "backend",
		difficulty: "medium",
		tags: ["typescript", "interfaces", "types"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är en generic i TypeScript?",
		answer:
			"En generic låter dig skapa återanvändbara komponenter och funktioner som kan fungera med olika typer.",
		category: "backend",
		difficulty: "hard",
		tags: ["typescript", "generics", "types"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är destructuring?",
		answer:
			"Destructuring är ett sätt att extrahera värden från objekt eller arrayer till separata variabler.",
		category: "backend",
		difficulty: "easy",
		tags: ["javascript", "destructuring", "syntax"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är en modul i TypeScript?",
		answer:
			"En modul är ett sätt att organisera kod i separata filer som kan importeras och exporteras mellan varandra.",
		category: "backend",
		difficulty: "medium",
		tags: ["typescript", "modules", "imports"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Extract flashcards from schema-vecka-3 (TypeScript fördjupning)
const schema3Flashcards = [
	{
		id: generateId("typescript"),
		question: "Vad är DOM manipulation?",
		answer:
			"DOM manipulation är processen att ändra HTML-dokumentets struktur, stil och innehåll med JavaScript.",
		category: "frontend",
		difficulty: "medium",
		tags: ["javascript", "dom", "manipulation"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är event delegation?",
		answer:
			"Event delegation är en teknik där man sätter en event listener på en förälder för att hantera händelser på barn-element effektivt.",
		category: "frontend",
		difficulty: "medium",
		tags: ["javascript", "events", "delegation"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är local storage?",
		answer:
			"Local storage är ett web API som låter dig spara data i webbläsaren som kvarstår efter att sidan stängs.",
		category: "frontend",
		difficulty: "easy",
		tags: ["javascript", "storage", "browser"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är en arrow function?",
		answer:
			"En arrow function är en kortare syntax för att definiera funktioner i JavaScript, ofta med implicit return.",
		category: "backend",
		difficulty: "easy",
		tags: ["javascript", "functions", "syntax"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är en callback function?",
		answer:
			"En callback function är en funktion som skickas som argument till en annan funktion och körs när ett specifikt event inträffar.",
		category: "backend",
		difficulty: "medium",
		tags: ["javascript", "callbacks", "functions"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Extract flashcards from schema-vecka-2 (TypeScript grunder)
const schema2Flashcards = [
	{
		id: generateId("typescript"),
		question: "Vad är en datatyp i TypeScript?",
		answer:
			"En datatyp definierar vilket slags värde en variabel kan hålla, t.ex. string, number, boolean, object.",
		category: "backend",
		difficulty: "easy",
		tags: ["typescript", "datatyper", "variabler"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är en array i TypeScript?",
		answer:
			"En array är en samling av värden av samma typ, som kan nås med ett index.",
		category: "backend",
		difficulty: "easy",
		tags: ["typescript", "arrays", "collections"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är en loop i TypeScript?",
		answer:
			"En loop är en kontrollstruktur som upprepar kod tills ett villkor är uppfyllt, t.ex. for, while, for...of.",
		category: "backend",
		difficulty: "easy",
		tags: ["typescript", "loops", "control-structures"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är en villkorssats?",
		answer:
			"En villkorssats är en kontrollstruktur som utför kod baserat på om ett villkor är sant eller falskt, t.ex. if/else.",
		category: "backend",
		difficulty: "easy",
		tags: ["typescript", "conditionals", "control-structures"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: generateId("typescript"),
		question: "Vad är en funktion i TypeScript?",
		answer:
			"En funktion är en återanvändbar kodblock som kan ta parametrar och returnera ett värde.",
		category: "backend",
		difficulty: "easy",
		tags: ["typescript", "functions", "programming"],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Combine all flashcards
const allFlashcards = [
	...schema9Flashcards,
	...schema8Flashcards,
	...schema7Flashcards,
	...schema6Flashcards,
	...schema5Flashcards,
	...schema4Flashcards,
	...schema3Flashcards,
	...schema2Flashcards,
];

// Create decks organized by category
const decks = [
	{
		id: "deck-nextjs",
		name: "Next.js & React",
		description:
			"Flashcards om Next.js, React och modern frontend-utveckling baserat på schema-vecka",
		category: "frontend",
		cards: [...schema9Flashcards, ...schema7Flashcards, ...schema5Flashcards],
		cardCount:
			schema9Flashcards.length +
			schema7Flashcards.length +
			schema5Flashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-agile",
		name: "Agile & Scrum",
		description:
			"Flashcards om agila metoder, Scrum och samarbete baserat på schema-vecka",
		category: "behavioral",
		cards: schema8Flashcards,
		cardCount: schema8Flashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-git",
		name: "Git & GitHub",
		description:
			"Flashcards om versionshantering och samarbete baserat på schema-vecka",
		category: "system-design",
		cards: schema8Flashcards.filter(
			(card) => card.tags.includes("git") || card.tags.includes("github"),
		),
		cardCount: schema8Flashcards.filter(
			(card) => card.tags.includes("git") || card.tags.includes("github"),
		).length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-api",
		name: "API-utveckling",
		description:
			"Flashcards om API:er, REST och backend-utveckling baserat på schema-vecka",
		category: "backend",
		cards: schema6Flashcards,
		cardCount: schema6Flashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-typescript",
		name: "TypeScript",
		description:
			"Flashcards om TypeScript och programmering baserat på schema-vecka",
		category: "backend",
		cards: [...schema4Flashcards, ...schema3Flashcards, ...schema2Flashcards],
		cardCount:
			schema4Flashcards.length +
			schema3Flashcards.length +
			schema2Flashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Write decks to files
decks.forEach((deck) => {
	const filePath = `src/data/decks/${deck.id.replace("deck-", "")}.json`;
	fs.writeFileSync(filePath, JSON.stringify(deck, null, 2));
	console.log(`Created: ${filePath} with ${deck.cardCount} flashcards`);
});

// Write all flashcards to a single file
fs.writeFileSync(
	"src/data/extracted/generated-flashcards.json",
	JSON.stringify(allFlashcards, null, 2),
);
console.log(`\nTotal flashcards generated: ${allFlashcards.length}`);
console.log("Flashcards generation complete!");
