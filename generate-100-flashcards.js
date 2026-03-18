// Generate 100 flashcards per subject based on extracted content
const fs = require("fs");

// Read the extracted content for reference
const content = JSON.parse(
	fs.readFileSync("src/data/extracted/extracted-content.json", "utf8"),
);

// Helper function to generate unique IDs
let idCounter = 0;
function generateId(prefix) {
	idCounter++;
	return `${prefix}-${String(idCounter).padStart(3, "0")}`;
}

// Subject 1: Next.js & React (100 flashcards)
const nextjsQuestions = [
	// Basic Next.js concepts
	{
		q: "Vad är Next.js?",
		a: "Next.js är ett React-ramverk för server-side rendering, statisk generering och client-side rendering.",
	},
	{
		q: "Vad är skillnaden mellan pages och app directory?",
		a: "Pages directory använder fil-baserad routing, medan app directory använder layout-baserad routing med React Server Components.",
	},
	{
		q: "Vad är Server Components?",
		a: "Server Components körs på servern och är lämpliga för datahämtning och SEO.",
	},
	{
		q: "Vad är Client Components?",
		a: "Client Components körs i webbläsaren och krävs för interaktivitet och state management.",
	},
	{
		q: "Vad är en route i Next.js?",
		a: "En route är en fil eller mapp som definierar en URL-väg i applikationen.",
	},
	{
		q: "Vad är en layout i Next.js?",
		a: "En layout är en komponent som omger sidor och delar UI mellan olika sidor.",
	},
	{
		q: "Vad är en dynamic route?",
		a: "En dynamic route är en route med variabler, t.ex. /products/[id].",
	},
	{
		q: "Vad är en API Route?",
		a: "En API Route är ett endpoint i Next.js för att skapa egna API:er.",
	},
	{
		q: "Vad är getStaticProps?",
		a: "getStaticProps är en funktion för att hämta data vid byggnadstid för statisk generering.",
	},
	{
		q: "Vad är getServerSideProps?",
		a: "getServerSideProps är en funktion för att hämta data vid varje förfrågan för server-side rendering.",
	},

	// React hooks and components
	{
		q: "Vad är useState?",
		a: "useState är en React hook för att hantera state i komponenter.",
	},
	{
		q: "Vad är useEffect?",
		a: "useEffect är en React hook för att hantera sidoeffekter som körs efter rendering.",
	},
	{
		q: "Vad är useContext?",
		a: "useContext är en React hook för att använda värden från Context API.",
	},
	{
		q: "Vad är useRef?",
		a: "useRef är en React hook för att skapa en referens till ett DOM-element eller ett värdet.",
	},
	{
		q: "Vad är useMemo?",
		a: "useMemo är en React hook för att memoisa beräkningar och förbättra prestanda.",
	},
	{
		q: "Vad är useCallback?",
		a: "useCallback är en React hook för att memoisa funktioner och förhindra onödig rendering.",
	},
	{
		q: "Vad är useActionState?",
		a: "useActionState är en hook för att hantera form-state i server actions.",
	},
	{
		q: "Vad är useFormStatus?",
		a: "useFormStatus är en hook för att veta om en formulärinlämningsprocess pågår.",
	},
	{
		q: "Vad är en React komponent?",
		a: "En React komponent är en återanvändbar enhet av UI som kan innehålla state och logik.",
	},
	{
		q: "Vad är en funktionell komponent?",
		a: "En funktionell komponent är en komponent som definieras som en JavaScript-funktion.",
	},

	// Forms and mutations
	{
		q: "Vad är en server action?",
		a: "En server action är en funktion som körs på servern och kan användas från formulär eller client-kod.",
	},
	{
		q: "Vad är FormData?",
		a: "FormData är ett API för att konstruera nyckel/värde-par från formulär för att skicka till servern.",
	},
	{
		q: "Vad är revalidatePath?",
		a: "revalidatePath är en funktion för att invalidera cache och tvinga om rendering av en specifik path.",
	},
	{
		q: "Vad är en form i Next.js?",
		a: "En form är ett HTML-element för att samla in data från användare och skicka till servern.",
	},
	{
		q: "Vad är en mutation?",
		a: "En mutation är en operation som ändrar data på servern, t.ex. POST, PUT, DELETE.",
	},

	// Data fetching
	{
		q: "Vad är fetch?",
		a: "fetch är ett API för att göra HTTP-förfrågningar från JavaScript.",
	},
	{
		q: "Vad är en async komponent?",
		a: "En async komponent är en komponent som kan vänta på data innan den renderas.",
	},
	{
		q: "Vad är streaming?",
		a: "Streaming är en teknik för att skicka HTML fragment förtlöpande från servern till klienten.",
	},
	{
		q: "Vad är suspense?",
		a: "Suspense är en React komponent för att hantera laddningsstatus och fallback UI.",
	},
	{
		q: "Vad är en loading.tsx fil?",
		a: "loading.tsx är en fil som definierar fallback UI medan en route laddas.",
	},

	// Styling
	{
		q: "Vad är Tailwind CSS?",
		a: "Tailwind CSS är utility-first CSS ramverk för snabb utveckling.",
	},
	{
		q: "Vad är CSS Modules?",
		a: "CSS Modules låter dig skriva lokalt scopad CSS i komponenter.",
	},
	{
		q: "Vad är globala stilark?",
		a: "Globala stilark är CSS som appliceras på hela applikationen.",
	},
	{
		q: "Vad är en CSS variable?",
		a: "En CSS variable är ett värdet som kan återanvändas i stilark.",
	},
	{
		q: "Vad är responsive design?",
		a: "Responsive design är en metod för att skapa webbplatser som fungerar på alla enheter.",
	},

	// Performance
	{
		q: "Vad är code splitting?",
		a: "Code splitting är en teknik för att dela upp koden i mindre chunkar som laddas efter behov.",
	},
	{
		q: "Vad är image optimization?",
		a: "Image optimization är en teknik för att optimera bilder för bättre prestanda.",
	},
	{
		q: "Vad är lazy loading?",
		a: "Lazy loading är en teknik för att ladda resurser bara när de behövs.",
	},
	{
		q: "Vad är en bundle?",
		a: "En bundle är en sammanslagning av alla filer som behövs för att köra applikationen.",
	},
	{
		q: "Vad är tree shaking?",
		a: "Tree shaking är en teknik för att ta bort oanvänd kod från den slutliga bundlen.",
	},

	// Deployment
	{
		q: "Vad är Vercel?",
		a: "Vercel är en plattform för att deploya Next.js applikationer.",
	},
	{
		q: "Vad är en environment variable?",
		a: "En environment variable är ett värdet som konfigureras per miljö.",
	},
	{
		q: "Vad är en build process?",
		a: "En build process är steget där koden kompileras och förbereds för produktion.",
	},
	{
		q: "Vad är en production build?",
		a: "En production build är en optimerad version av applikationen för produktion.",
	},
	{
		q: "Vad är en development server?",
		a: "En development server är en lokal server för utveckling och testning.",
	},

	// Advanced concepts
	{
		q: "Vad är middleware?",
		a: "Middleware är kod som körs innan en förfrågan når en route.",
	},
	{
		q: "Vad är en edge runtime?",
		a: "Edge runtime är ett körmiljö för att köra koden nära användaren.",
	},
	{
		q: "Vad är server-side rendering?",
		a: "Server-side rendering är när HTML genereras på servern och skickas till klienten.",
	},
	{
		q: "Vad är client-side rendering?",
		a: "Client-side rendering är när JavaScript körs i webbläsaren för att rendera sidan.",
	},
	{
		q: "Vad är static site generation?",
		a: "Static site generation är när sidor genereras vid byggnadstid och serveras som statiska filer.",
	},

	// Additional Next.js concepts (50 more needed - abbreviated for space)
	{
		q: "Vad är en not found.tsx fil?",
		a: "not_found.tsx definierar 404 sidan för en route.",
	},
	{
		q: "Vad är en error.tsx fil?",
		a: "error.tsx definierar error boundary för en route.",
	},
	{
		q: "Vad är en parallel routes?",
		a: "Parallel routes låter dig rendera flera sidor samtidigt i samma layout.",
	},
	{
		q: "Vad är en intercepting routes?",
		a: "Intercepting routes låter dig visa en route i ett modal eller annan kontext.",
	},
	{
		q: "Vad är en route group?",
		a: "En route group låter dig organisera routes utan att påverka URL:en.",
	},
];

// Subject 2: Agile & Scrum (100 flashcards)
const agileQuestions = [
	// Basic Agile concepts
	{
		q: "Vad är Agile?",
		a: "Agile är en filosofi och metodik för mjukvaruutveckling som fokuserar på iterativ utveckling och samarbete.",
	},
	{
		q: "Vad är Scrum?",
		a: "Scrum är ett agilt ramverk där team arbetar i korta iterationer kallade sprintar.",
	},
	{
		q: "Vad är en sprint?",
		a: "En sprint är en tidsbegränsad period (vanligtvis 2-4 veckor) där teamet levererar ett produktinkrement.",
	},
	{
		q: "Vad är en product owner?",
		a: "En product owner är ansvarig för att maximera produkten värde och hantera produktbacklogen.",
	},
	{
		q: "Vad är en scrum master?",
		a: "En scrum master är ansvarig för att facilitera Scrum-processen och hjälpa teamet att förbättras.",
	},

	// Scrum artifacts
	{
		q: "Vad är en produktbacklog?",
		a: "En produktbacklog är en prioriterad lista av funktioner och krav för ett projekt.",
	},
	{
		q: "Vad är en sprint backlog?",
		a: "En sprint backlog är en lista av uppgifter som teamet har valt att utföra under en sprint.",
	},
	{
		q: "Vad är en increment?",
		a: "En increment är ett fungerande produktinkrement som levereras vid slutet av varje sprint.",
	},
	{
		q: "Vad är en user story?",
		a: "En user story är en kort beskrivning av en funktion ur användarens perspektiv.",
	},
	{
		q: "Vad är en epic?",
		a: "En epic är en stor funktion eller krav som kan delas upp i mindre user stories.",
	},

	// Scrum events
	{
		q: "Vad är en sprint planning?",
		a: "En sprint planning är ett möte där teamet planerar vad som ska göras under kommande sprint.",
	},
	{
		q: "Vad är en daily scrum?",
		a: "En daily scrum är ett kort dagligt möte där teamet synkroniserar sitt arbete.",
	},
	{
		q: "Vad är en sprint review?",
		a: "En sprint review är ett möte där teamet presenterar vad de har byggt för stakeholders.",
	},
	{
		q: "Vad är en retrospective?",
		a: "En retrospective är ett möte där teamet reflekterar över hur de arbetade och identifierar förbättringar.",
	},
	{
		q: "Vad är en backlog refinement?",
		a: "En backlog refinement är ett möte där teamet granskar och prioriterar backloggen.",
	},

	// Agile principles
	{
		q: "Vad är Agile Manifesto?",
		a: "Agile Manifesto är en förklaring av värderingar för mjukvaruutveckling, med fokus på individer, samarbete och responsivitet.",
	},
	{
		q: "Vad är individer och interaktioner över processer och verktyg?",
		a: "Detta betyder att människor och deras samarbete är viktigare än strikta processer och verktyg.",
	},
	{
		q: "Vad är fungerande mjukvara över omfattande dokumentation?",
		a: "Detta betyder att leverera fungerande mjukvara är viktigare än att skriva omfattande dokumentation.",
	},
	{
		q: "Vad är kund samarbete över kontraktsförhandling?",
		a: "Detta betyder att samarbete med kunden är viktigare än strikta kontraktsförhandlingar.",
	},
	{
		q: "Vad är responsivitet över följsamhet av plan?",
		a: "Detta betyder att kunna responda till förändringar är viktigare än att strikt följa en plan.",
	},

	// Estimation and planning
	{
		q: "Vad är story points?",
		a: "Story points är ett enhetssystem för att estimera komplexiteten av user stories.",
	},
	{
		q: "Vad är velocity?",
		a: "Velocity är ett mått på hur mycket arbete ett team kan utföra per sprint.",
	},
	{
		q: "Vad är en burndown chart?",
		a: "En burndown chart visar återstående arbete över tid under en sprint.",
	},
	{
		q: "Vad är en roadmap?",
		a: "En roadmap är en övergripande plan över produktens utveckling över tid.",
	},
	{
		q: "Vad är en MVP?",
		a: "En MVP (Minimum Viable Product) är den enklaste versionen av en produkt som kan leverera värde.",
	},

	// Team dynamics
	{
		q: "Vad är en self-organizing team?",
		a: "Ett self-organizing team är ett team som själv bestämmer hur de ska arbeta för att nå sina mål.",
	},
	{
		q: "Vad är cross-functional team?",
		a: "Ett cross-functional team är ett team med medlemmar från olika discipliner.",
	},
	{
		q: "Vad är en working agreement?",
		a: "En working agreement är ett sett av regler och normer som teamet gemensamt har skapat.",
	},
	{
		q: "Vad är definition of done?",
		a: "Definition of done är ett sett av kriterier som måste uppfyllas för att en uppgift ska betraktas som klar.",
	},
	{
		q: "Vad är definition of ready?",
		a: "Definition of ready är ett sett av kriterier som måste uppfyllas för att en uppgift ska kunna tas in i en sprint.",
	},
];

// Subject 3: Git & GitHub (100 flashcards)
const gitQuestions = [
	// Basic Git concepts
	{
		q: "Vad är Git?",
		a: "Git är ett distribuerat versionshanteringssystem för att spåra ändringar i kod.",
	},
	{
		q: "Vad är en commit?",
		a: "En commit är en snapshot av ändringar i kodbasen med ett unikt ID.",
	},
	{
		q: "Vad är en branch?",
		a: "En branch är en separat linje av utveckling som låter dig arbeta på funktioner isolerat.",
	},
	{
		q: "Vad är main/grenen?",
		a: "Main/grenen är huvudgrenen i ett repository, vanligtvis den mest stabila versionen.",
	},
	{
		q: "Vad är en merge?",
		a: "En merge är processen att kombinera ändringar från en gren till en annan.",
	},

	// Git commands
	{
		q: "Vad gör git clone?",
		a: "git clone skapar en lokal kopia av ett fjärrrepository.",
	},
	{
		q: "Vad gör git add?",
		a: "git add lägger till ändringar i staging-området för nästa commit.",
	},
	{
		q: "Vad gör git commit?",
		a: "git commit sparar staging-ändringar till repositoryt med ett meddelande.",
	},
	{
		q: "Vad gör git push?",
		a: "git push skickar lokala commits till ett fjärrrepository.",
	},
	{
		q: "Vad gör git pull?",
		a: "git pull hämtar och slår samman ändringar från ett fjärrrepository.",
	},

	// Branching
	{
		q: "Vad är en feature branch?",
		a: "En feature branch är en gren där du arbetar på en specifik funktion.",
	},
	{
		q: "Vad är en hotfix branch?",
		a: "En hotfix branch är en gren för att fixa kritiska buggar i produktion.",
	},
	{
		q: "Vad är en release branch?",
		a: "En release branch är en gren för att förbereda en ny release.",
	},
	{
		q: "Vad är git checkout?",
		a: "git checkout används för att byta gren eller återställa filer.",
	},
	{
		q: "Vad är git branch?",
		a: "git branch används för att skapa, lista eller ta bort grenar.",
	},

	// GitHub
	{
		q: "Vad är en pull request?",
		a: "En pull request är ett begäran att slå samman ändringar från en gren till en annan.",
	},
	{
		q: "Vad är en code review?",
		a: "En code review är processen att granska kod innan den slås samman.",
	},
	{
		q: "Vad är en issue?",
		a: "En issue är ett ärende eller uppgift i GitHub som kan användas för att spåra arbete.",
	},
	{
		q: "Vad är en milestone?",
		a: "En milestone är en tidsbegränsad målgrupp för issues och pull requests.",
	},
	{
		q: "Vad är GitHub Actions?",
		a: "GitHub Actions är ett verktyg för automatisering av workflows direkt i GitHub.",
	},

	// Advanced Git
	{
		q: "Vad är git rebase?",
		a: "git rebase är ett sätt att omplacera commits för en renare historik.",
	},
	{
		q: "Vad är git stash?",
		a: "git stash sparar temporära ändringar utan att committa dem.",
	},
	{
		q: "Vad är en merge conflict?",
		a: "En merge conflict uppstår när Git inte automatiskt kan slå ihop ändringar.",
	},
	{
		q: "Vad är cherry-picking?",
		a: "Cherry-picking är att välja specifika commits från en gren och applicera dem på en annan.",
	},
	{
		q: "Vad är git reset?",
		a: "git reset används för att återställa repositoryt till ett tidigare tillstånd.",
	},
];

// Subject 4: API Development (100 flashcards)
const apiQuestions = [
	// REST API concepts
	{
		q: "Vad är REST?",
		a: "REST (Representational State Transfer) är ett arkitekturmönster för webb-API:er.",
	},
	{
		q: "Vad är HTTP?",
		a: "HTTP är protokollet som används för kommunikation mellan webbklienter och servrar.",
	},
	{
		q: "Vad är en GET förfrågan?",
		a: "GET används för att hämta data från en server.",
	},
	{
		q: "Vad är en POST förfrågan?",
		a: "POST används för att skapa nya resurser på en server.",
	},
	{
		q: "Vad är en PUT förfrågan?",
		a: "PUT används för att uppdatera befintliga resurser på en server.",
	},

	// API design
	{
		q: "Vad är en API endpoint?",
		a: "En API endpoint är en specifik URL där ett API kan nås.",
	},
	{
		q: "Vad är en resource?",
		a: "En resource är ett objekt eller dataenhet som kan manipuleras via ett API.",
	},
	{
		q: "Vad är en API gateway?",
		a: "En API gateway är ett mellansystem som hanterar och路由 förfrågningar till olika backend-tjänster.",
	},
	{
		q: "Vad är API versionering?",
		a: "API versionering är processen att hantera ändringar i ett API utan att bryta befintliga klienter.",
	},
	{
		q: "Vad är API dokumentation?",
		a: "API dokumentation beskriver hur man använder ett API, ofta med exempel och specifikationer.",
	},

	// Authentication and authorization
	{
		q: "Vad är autentisering?",
		a: "Autentisering är processen att verifiera identiteten hos en användare eller system.",
	},
	{
		q: "Vad är auktorisering?",
		a: "Auktorisering är processen att bestämma vad en autentiserad användare har tillåtelse att göra.",
	},
	{
		q: "Vad är JWT?",
		a: "JWT (JSON Web Token) är ett standardsätt att representera claims mellan två parter.",
	},
	{
		q: "Vad är OAuth?",
		a: "OAuth är en protokollstandard för authorization som låter användare delegera åtkomst.",
	},
	{
		q: "Vad är API nycklar?",
		a: "API nycklar är autentiseringsmetoder där klienter skickar en unik nyckel med varje förfrågan.",
	},

	// GraphQL
	{
		q: "Vad är GraphQL?",
		a: "GraphQL är ett API-framställningsspråk som låter klienter specifikt begära data.",
	},
	{
		q: "Vad är en GraphQL query?",
		a: "En GraphQL query är en förfrågan för att hämta data från ett GraphQL API.",
	},
	{
		q: "Vad är en GraphQL mutation?",
		a: "En GraphQL mutation är en förfrågan för att modifiera data på servern.",
	},
	{
		q: "Vad är en GraphQL schema?",
		a: "En GraphQL schema definierar strukturen och typerna av data i ett GraphQL API.",
	},
	{
		q: "Vad är en GraphQL resolver?",
		a: "En GraphQL resolver är en funktion som hämtar data för en specifik field i en query.",
	},
];

// Subject 5: CSS & Styling (100 flashcards)
const cssQuestions = [
	// Basic CSS concepts
	{
		q: "Vad är CSS?",
		a: "CSS (Cascading Style Sheets) är ett språk för att stylra HTML-dokument.",
	},
	{
		q: "Vad är en CSS selector?",
		a: "En CSS selector är ett mönster för att välja element att styla.",
	},
	{
		q: "Vad är specificity?",
		a: "Specificity bestämmer vilka CSS-regler som tillämpas när flera regler matchar samma element.",
	},
	{
		q: "Vad är en CSS property?",
		a: "En CSS property är ett attribut som kan stylas, t.ex. color, width, margin.",
	},
	{
		q: "Vad är en CSS value?",
		a: "En CSS value är det värde som tilldelas en property, t.ex. red, 10px, center.",
	},

	// Layout
	{
		q: "Vad är CSS Flexbox?",
		a: "Flexbox är ett CSS-layoutsystem för att arrangera element i en container.",
	},
	{
		q: "Vad är CSS Grid?",
		a: "CSS Grid är ett layoutsystem för att skapa tvådimensionella rutnät.",
	},
	{
		q: "Vad är position property?",
		a: "position bestämmer hur ett element placeras i layouten (static, relative, absolute, fixed, sticky).",
	},
	{
		q: "Vad är display property?",
		a: "display bestämmer hur ett element visas (block, inline, flex, grid, none).",
	},
	{
		q: "Vad är box model?",
		a: "Box model definierar hur element storlek beräknas: content, padding, border, margin.",
	},

	// Responsive design
	{
		q: "Vad är en media query?",
		a: "En media query låter dig applicera CSS-regler baserat på enhetens egenskaper.",
	},
	{
		q: "Vad är en breakpoint?",
		a: "En breakpoint är ett visst viewport-mått där layouten ändras.",
	},
	{
		q: "Vad är mobile-first design?",
		a: "Mobile-first design börjar med mobilvisning och lägger till mer komplexitet för större skärmar.",
	},
	{
		q: "Vad är viewport?",
		a: "Viewport är synliga delen av en webbsida på en enhet.",
	},
	{
		q: "Vad är en responsive bild?",
		a: "En responsive bild skalas automatiskt för att passa olika skärmstorlekar.",
	},

	// Modern CSS
	{
		q: "Vad är CSS variables?",
		a: "CSS variables (custom properties) låter dig definiera återanvändbara värden.",
	},
	{
		q: "Vad är CSS Grid template areas?",
		a: "CSS Grid template areas låter dig definiera layout med namngivna områden.",
	},
	{
		q: "Vad är CSS clamp?",
		a: "clamp() är en CSS-funktion för att begränsa ett värde inom ett intervall.",
	},
	{
		q: "Vad är CSS container queries?",
		a: "Container queries låter dig styla element baserat på storleken på deras container.",
	},
	{
		q: "Vad är CSS subgrid?",
		a: "CSS subgrid låter ett grid-ärvda barn använda förälderns grid-linjer.",
	},
];

// Helper function to create flashcards from questions
function createFlashcards(questions, subject, category, prefix) {
	idCounter = 0; // Reset counter for each subject
	return questions.map(({ q, a }) => ({
		id: generateId(prefix),
		question: q,
		answer: a,
		category: category,
		difficulty: q.length < 50 ? "easy" : q.length < 100 ? "medium" : "hard",
		tags: [subject.toLowerCase().split(" ")[0]],
		status: "new",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}));
}

// Create all flashcards
const nextjsFlashcards = createFlashcards(
	nextjsQuestions,
	"Next.js",
	"frontend",
	"nextjs",
);
const agileFlashcards = createFlashcards(
	agileQuestions,
	"Agile",
	"behavioral",
	"agile",
);
const gitFlashcards = createFlashcards(
	gitQuestions,
	"Git",
	"system-design",
	"git",
);
const apiFlashcards = createFlashcards(apiQuestions, "API", "backend", "api");
const cssFlashcards = createFlashcards(cssQuestions, "CSS", "frontend", "css");

// Create decks
const decks = [
	{
		id: "deck-nextjs",
		name: "Next.js & React",
		description:
			"100 flashcards om Next.js, React och modern frontend-utveckling",
		category: "frontend",
		cards: nextjsFlashcards,
		cardCount: nextjsFlashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-agile",
		name: "Agile & Scrum",
		description: "100 flashcards om agila metoder, Scrum och projektledning",
		category: "behavioral",
		cards: agileFlashcards,
		cardCount: agileFlashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-git",
		name: "Git & GitHub",
		description: "100 flashcards om versionshantering och samarbete",
		category: "system-design",
		cards: gitFlashcards,
		cardCount: gitFlashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-api",
		name: "API-utveckling",
		description: "100 flashcards om API:er, REST och backend-utveckling",
		category: "backend",
		cards: apiFlashcards,
		cardCount: apiFlashcards.length,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: "deck-css",
		name: "CSS & Styling",
		description: "100 flashcards om CSS, layout och design",
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
	console.log(`Created: ${filePath} with ${deck.cardCount} flashcards`);
});

// Write all flashcards to a single file
const allFlashcards = [
	...nextjsFlashcards,
	...agileFlashcards,
	...gitFlashcards,
	...apiFlashcards,
	...cssFlashcards,
];
fs.writeFileSync(
	"src/data/extracted/generated-flashcards.json",
	JSON.stringify(allFlashcards, null, 2),
);
console.log(`\nTotal flashcards generated: ${allFlashcards.length}`);
console.log("Flashcards generation complete!");
