export interface Card {
	id: string;
	question: string;
	answer: string;
	category: string;
	difficulty: "easy" | "medium" | "hard";
}

export interface Deck {
	id: string;
	title: string;
	description: string;
	cardCount: number;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	category: string;
	cards: Card[];
}

const deckData: Deck[] = [
	{
		id: "frontend",
		title: "Frontend Mastery",
		description: "React, Vue, CSS, DOM manipulation, and modern browser APIs",
		cardCount: 6,
		difficulty: "Intermediate",
		category: "Technical",
		cards: [
			{
				id: "fe-1",
				question:
					"What is the difference between interface and type in TypeScript?",
				answer:
					"Both can be used to describe the shape of an object but 'interface' can only describe an object shape and can be merged. 'type' can be an alias to primitives, unions, and tuples. Interfaces are generally preferred for object definitions.",
				category: "TypeScript",
				difficulty: "medium",
			},
			{
				id: "fe-2",
				question: "Explain the CSS Box Model.",
				answer:
					"The CSS Box Model consists of: Content (text/images), Padding (space around content), Border (surrounds padding), and Margin (space outside border). The box-sizing property controls whether padding and border are included in the element's total width/height.",
				category: "CSS",
				difficulty: "easy",
			},
			{
				id: "fe-3",
				question:
					"What is the difference between useState and useRef in React?",
				answer:
					"useState triggers re-renders when updated, while useRef does not. useRef is for persisting values without causing re-renders, often used for DOM elements or storing mutable values.",
				category: "React",
				difficulty: "easy",
			},
			{
				id: "fe-4",
				question: "What is the Virtual DOM and how does it work?",
				answer:
					"The Virtual DOM is a JavaScript representation of the actual DOM. React creates a virtual DOM tree, compares it with the previous version (diffing), and only updates the changed parts in the real DOM (reconciliation), improving performance.",
				category: "React",
				difficulty: "medium",
			},
			{
				id: "fe-5",
				question: "Explain CSS specificity hierarchy.",
				answer:
					"CSS specificity determines which styles are applied: Inline styles (1000) > IDs (100) > Classes, pseudo-classes, attributes (10) > Elements, pseudo-elements (1). The selector with the highest specificity wins.",
				category: "CSS",
				difficulty: "hard",
			},
			{
				id: "fe-6",
				question: "What are React Server Components?",
				answer:
					"React Server Components (RSC) are components that render exclusively on the server. They can access server-side resources directly, reduce client-side JavaScript bundle size, and improve initial page load performance.",
				category: "React",
				difficulty: "hard",
			},
		],
	},
	{
		id: "backend",
		title: "Backend Architecture",
		description: "APIs, databases, microservices, and server optimization",
		cardCount: 6,
		difficulty: "Advanced",
		category: "Technical",
		cards: [
			{
				id: "be-1",
				question: "What is REST and what are its principles?",
				answer:
					"REST (Representational State Transfer) is an architectural style with principles: Client-Server separation, Stateless (no client context stored), Cacheable responses, Uniform Interface, Layered System, and Code on Demand (optional).",
				category: "API Design",
				difficulty: "easy",
			},
			{
				id: "be-2",
				question: "Explain the CAP theorem.",
				answer:
					"CAP theorem states that a distributed data store can only provide two of three guarantees: Consistency (all nodes see same data), Availability (every request gets a response), and Partition Tolerance (system continues despite network failures). Partition tolerance is mandatory in distributed systems.",
				category: "System Design",
				difficulty: "hard",
			},
			{
				id: "be-3",
				question: "What is database normalization?",
				answer:
					"Database normalization is the process of organizing data to reduce redundancy and improve integrity. Normal forms: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies), BCNF, 4NF, and 5NF.",
				category: "Database",
				difficulty: "medium",
			},
			{
				id: "be-4",
				question: "What is the difference between SQL and NoSQL databases?",
				answer:
					"SQL databases are relational, use structured schemas, support ACID transactions, and scale vertically. NoSQL databases are non-relational, schema-flexible, scale horizontally, and include document, key-value, wide-column, and graph types.",
				category: "Database",
				difficulty: "easy",
			},
			{
				id: "be-5",
				question: "What are microservices and their advantages?",
				answer:
					"Microservices architecture structures applications as loosely coupled services. Advantages: Independent deployment, technology diversity, better fault isolation, easier scaling of specific services, and team autonomy. Challenges include complexity and distributed system issues.",
				category: "Architecture",
				difficulty: "medium",
			},
			{
				id: "be-6",
				question: "Explain JWT authentication flow.",
				answer:
					"JWT (JSON Web Token) flow: 1) User sends credentials, 2) Server validates and creates JWT (header.payload.signature), 3) Client stores JWT, 4) Client sends JWT in Authorization header, 5) Server verifies JWT signature and grants access. Contains claims about user identity.",
				category: "Security",
				difficulty: "medium",
			},
		],
	},
	{
		id: "system-design",
		title: "System Design",
		description:
			"Scalability, caching, load balancing, and distributed systems",
		cardCount: 5,
		difficulty: "Advanced",
		category: "Architecture",
		cards: [
			{
				id: "sd-1",
				question: "What is horizontal vs vertical scaling?",
				answer:
					"Horizontal scaling (scale out) adds more machines to distribute load, providing better availability and no single point of failure. Vertical scaling (scale up) adds more power (CPU, RAM) to existing machines, simpler but has hardware limits and single point of failure.",
				category: "Scalability",
				difficulty: "easy",
			},
			{
				id: "sd-2",
				question: "Explain different types of caching strategies.",
				answer:
					"Cache strategies: Cache-Aside (lazy loading), Read-Through (cache as main data source), Write-Through (write to cache and DB together), Write-Behind/Back (async DB writes), and Refresh-Ahead (preemptive cache refresh). Each has different consistency and performance trade-offs.",
				category: "Performance",
				difficulty: "hard",
			},
			{
				id: "sd-3",
				question: "What is a CDN and how does it work?",
				answer:
					"CDN (Content Delivery Network) is a distributed server network that delivers content based on geographic location. It caches static assets at edge locations closer to users, reducing latency, improving load times, and reducing origin server load.",
				category: "Performance",
				difficulty: "medium",
			},
			{
				id: "sd-4",
				question: "How does load balancing work?",
				answer:
					"Load balancing distributes traffic across multiple servers using algorithms: Round Robin (sequential), Least Connections (fewest active), IP Hash (consistent routing), or Weighted (server capacity-based). Improves availability, scalability, and prevents overload.",
				category: "Scalability",
				difficulty: "medium",
			},
			{
				id: "sd-5",
				question: "What is database sharding?",
				answer:
					"Database sharding splits data across multiple databases (shards) based on a shard key. Types: Range-based (sequential), Hash-based (even distribution), and Directory-based (lookup table). Benefits: horizontal scaling, improved performance. Challenges: complexity, cross-shard queries.",
				category: "Database",
				difficulty: "hard",
			},
		],
	},
	{
		id: "javascript",
		title: "JavaScript Core",
		description: "ES6+, closures, async/await, prototypes, and event loop",
		cardCount: 6,
		difficulty: "Intermediate",
		category: "Language",
		cards: [
			{
				id: "js-1",
				question: "Explain Closure in JavaScript.",
				answer:
					"A closure is the combination of a function bundled together with references to its surrounding state (lexical environment). It gives you access to an outer function's scope from an inner function, even after the outer function has returned.",
				category: "JavaScript",
				difficulty: "medium",
			},
			{
				id: "js-2",
				question: "How does the JavaScript Event Loop work?",
				answer:
					"The Event Loop continuously checks if the call stack is empty. If empty, it moves tasks from the callback queue (macrotasks) and microtask queue to the stack. Order: synchronous code → microtasks (Promises) → macrotasks (setTimeout). Enables non-blocking I/O.",
				category: "JavaScript",
				difficulty: "hard",
			},
			{
				id: "js-3",
				question: "What is the difference between var, let, and const?",
				answer:
					"var: function-scoped, hoisted, can be redeclared. let: block-scoped, not hoisted, cannot be redeclared in same scope. const: block-scoped, not hoisted, cannot be reassigned (though object properties can be modified). Prefer const, use let when reassignment needed.",
				category: "JavaScript",
				difficulty: "easy",
			},
			{
				id: "js-4",
				question: "Explain Promises and async/await.",
				answer:
					"Promises represent future completion of async operations with states: pending, fulfilled, or rejected. async/await is syntactic sugar over Promises - 'async' declares an async function, 'await' pauses execution until Promise resolves, making async code look synchronous.",
				category: "JavaScript",
				difficulty: "medium",
			},
			{
				id: "js-5",
				question: "What is prototypal inheritance?",
				answer:
					"JavaScript uses prototypal inheritance where objects inherit from other objects via prototypes. Each object has a [[Prototype]] linking to another object. When accessing a property, JS walks up the prototype chain until found. Class syntax is syntactic sugar over this system.",
				category: "JavaScript",
				difficulty: "hard",
			},
			{
				id: "js-6",
				question: "What are JavaScript modules (ES6)?",
				answer:
					"ES6 modules allow code splitting and reuse. export: named exports (export const foo) or default export (export default). import: named imports (import { foo }) or default import (import foo). Modules have their own scope and execute only once (singleton).",
				category: "JavaScript",
				difficulty: "easy",
			},
		],
	},
	{
		id: "behavioral",
		title: "Behavioral Questions",
		description: "STAR method, conflict resolution, and leadership scenarios",
		cardCount: 5,
		difficulty: "Beginner",
		category: "Soft Skills",
		cards: [
			{
				id: "beh-1",
				question: "Tell me about a time you had a conflict with a team member.",
				answer:
					"Use STAR method: Situation (context), Task (your responsibility), Action (steps taken to resolve), Result (positive outcome). Emphasize active listening, finding common ground, and focusing on project goals over personal differences.",
				category: "Conflict Resolution",
				difficulty: "medium",
			},
			{
				id: "beh-2",
				question: "Describe a time when you missed a deadline.",
				answer:
					"Be honest but focus on lessons learned. Explain: 1) Why the deadline was missed (scope creep, unexpected issues), 2) How you communicated proactively, 3) Steps taken to minimize impact, 4) Process improvements implemented to prevent recurrence.",
				category: "Accountability",
				difficulty: "medium",
			},
			{
				id: "beh-3",
				question: "Tell me about a time you had to learn something quickly.",
				answer:
					"Show adaptability and learning strategy. Describe: 1) The new technology/situation, 2) Your approach (documentation, mentorship, experimentation), 3) How you applied it quickly, 4) Successful outcome. Demonstrates growth mindset and resourcefulness.",
				category: "Adaptability",
				difficulty: "easy",
			},
			{
				id: "beh-4",
				question: "Describe a situation where you showed leadership.",
				answer:
					"Leadership isn't just about titles. Describe: 1) Initiative taken without being asked, 2) How you motivated/influenced others, 3) Challenges overcome, 4) Measurable results. Can include mentoring, driving process improvements, or leading by example.",
				category: "Leadership",
				difficulty: "medium",
			},
			{
				id: "beh-5",
				question: "How do you handle receiving critical feedback?",
				answer:
					"Show emotional intelligence: 1) Listen actively without defensiveness, 2) Ask clarifying questions, 3) Reflect on validity, 4) Create action plan, 5) Follow up on improvements. Frame feedback as growth opportunities and demonstrate self-awareness.",
				category: "Growth Mindset",
				difficulty: "easy",
			},
		],
	},
	{
		id: "algorithms",
		title: "Data Structures",
		description: "Arrays, trees, graphs, sorting, and Big O notation",
		cardCount: 6,
		difficulty: "Intermediate",
		category: "CS Fundamentals",
		cards: [
			{
				id: "algo-1",
				question: "What is Big O notation and why is it important?",
				answer:
					"Big O notation describes the upper bound of algorithm complexity as input size grows. It helps analyze time (operations) and space (memory) efficiency. Common complexities: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic.",
				category: "Analysis",
				difficulty: "easy",
			},
			{
				id: "algo-2",
				question: "Explain the difference between Array and Linked List.",
				answer:
					"Array: contiguous memory, O(1) access by index, fixed size (usually), expensive insertion/deletion. Linked List: scattered memory with pointers, O(n) access, dynamic size, O(1) insertion/deletion at head. Arrays better for access, linked lists better for frequent modifications.",
				category: "Data Structures",
				difficulty: "medium",
			},
			{
				id: "algo-3",
				question: "How does Binary Search work?",
				answer:
					"Binary Search finds elements in sorted arrays by repeatedly dividing search interval in half. Compare target with middle element, eliminate half where target cannot be. Time complexity: O(log n). Requires sorted data. Much faster than linear search O(n) for large datasets.",
				category: "Algorithms",
				difficulty: "easy",
			},
			{
				id: "algo-4",
				question: "What is the difference between BFS and DFS?",
				answer:
					"BFS (Breadth-First Search) explores level by level using a queue, finds shortest path in unweighted graphs. DFS (Depth-First Search) explores as far as possible along branches using a stack/recursion, better for exhaustive search. BFS uses more memory, DFS can get stuck in deep paths.",
				category: "Algorithms",
				difficulty: "medium",
			},
			{
				id: "algo-5",
				question: "Explain Hash Tables and collision resolution.",
				answer:
					"Hash Tables provide O(1) average case for insert, delete, and lookup by mapping keys to array indices via a hash function. Collisions occur when different keys hash to same index. Resolution methods: Chaining (linked lists at each bucket) or Open Addressing (probing for next empty slot).",
				category: "Data Structures",
				difficulty: "medium",
			},
			{
				id: "algo-6",
				question: "Compare QuickSort and MergeSort.",
				answer:
					"QuickSort: O(n log n) average, O(n²) worst, in-place (O(log n) space), not stable, cache-friendly. MergeSort: O(n log n) always, requires O(n) space, stable, good for linked lists and external sorting. QuickSort generally faster in practice for arrays.",
				category: "Algorithms",
				difficulty: "hard",
			},
		],
	},
];

export function getDeckById(id: string): Deck | undefined {
	return deckData.find((deck) => deck.id === id);
}

export function getAllDecks(): Omit<Deck, "cards">[] {
	return deckData.map(({ cards, ...deckInfo }) => deckInfo);
}
