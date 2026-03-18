/**
 * STEP 2: AI-Powered Flashcard Generation using opencode local model
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

interface ExtractedContent {
	repoName: string;
	files: {
		path: string;
		content: string;
		type: string;
	}[];
}

interface FlashcardData {
	repoName: string;
	topic: string;
	question: string;
	answer: string;
	difficulty: "easy" | "medium" | "hard";
	tags: string[];
}

const OUTPUT_DIR = path.join(__dirname, "..", "src", "data", "extracted");
const MODEL = "opencode/mimo-v2-flash-free"; // Confirmed from opencode models list

/**
 * Extracts JSON array from the opencode output.
 * Tries parsing the whole output first, then looks for the first '[' and matching ']'.
 */
function extractJsonFromOutput(output: string): any[] {
	// 1. Try parsing the whole output as JSON (if it's clean)
	try {
		const parsed = JSON.parse(output);
		if (Array.isArray(parsed)) return parsed;
	} catch (e) {
		// Not clean JSON, proceed to extraction
	}

	// 2. Regex to find JSON array
	const startIndex = output.indexOf("[");
	if (startIndex === -1) throw new Error("No JSON array start found in output");

	let braceCount = 0;
	let endIndex = -1;

	for (let i = startIndex; i < output.length; i++) {
		if (output[i] === "[") braceCount++;
		else if (output[i] === "]") {
			braceCount--;
			if (braceCount === 0) {
				endIndex = i;
				break;
			}
		}
	}

	if (endIndex === -1) throw new Error("No matching closing bracket found");

	const jsonString = output.substring(startIndex, endIndex + 1);

	try {
		return JSON.parse(jsonString);
	} catch (e) {
		console.error("Failed to parse extracted JSON string.");
		throw e;
	}
}

/**
 * Analyzes content using opencode and generates flashcards.
 */
function analyzeWithAI(content: string, repoName: string): FlashcardData[] {
	console.log(`  Analyzing content from ${repoName} with AI...`);

	// Truncate content to avoid token limits (approx 4000 chars)
	const truncatedContent = content.substring(0, 4000);

	// Strict prompt to force JSON output and Swedish language
	const prompt = `
Du är en expert på att skapa tekniska flashcards.
Generera 3 till 5 flashcards baserat på följande text från ett GitHub-repo.

INSTRUKTIONER:
1. Analysera koden/texten och identifiera viktiga koncept (React, CSS, Agile, etc.).
2. Skapa flashcards på SVENSKA.
3. Output MÅSTE vara en giltig JSON-array utan någon annan text eller förklaringar.
4. Varje flashcard måste ha fälten: "question", "answer", "difficulty" ("easy", "medium", "hard"), och "tags" (array av strängar).

EXEMPEL PÅ OUTPUT:
[
  {
    "question": "Vad är React hooks?",
    "answer": "React hooks låter dig använda state och andra React-funktioner i funktionella komponenter.",
    "difficulty": "medium",
    "tags": ["react", "hooks"]
  }
]

TEXT ATT ANALYZERA:
${truncatedContent}

JSON OUTPUT:
`;

	let rawOutput = "";
	try {
		// Use stdin piping to avoid shell argument splitting issues
		const command = `opencode run --model ${MODEL}`;
		console.log(`  Running: ${command}`);

		rawOutput = execSync(command, {
			input: prompt,
			encoding: "utf-8",
			maxBuffer: 10 * 1024 * 1024,
		});

		// Log output for debugging if parsing fails later
		console.log(`  Received output length: ${rawOutput.length}`);

		const flashcardsData = extractJsonFromOutput(rawOutput);

		if (!Array.isArray(flashcardsData)) {
			throw new Error("Extracted data is not an array");
		}

		// Map and normalize the data
		return flashcardsData.map((fc: Record<string, any>) => ({
			repoName,
			topic: "General",
			// Handle Swedish keys if model uses them, fallback to English
			question: (fc.question || fc.fråga || "Unknown Question").toString(),
			answer: (fc.answer || fc.svar || "Unknown Answer").toString(),
			// Normalize difficulty
			difficulty: (() => {
				const diff = (fc.difficulty || "").toString().toLowerCase();
				if (diff === "easy" || diff === "enkel") return "easy";
				if (diff === "hard" || diff === "svår") return "hard";
				return "medium";
			})(),
			// Ensure tags is an array
			tags: Array.isArray(fc.tags) ? fc.tags : ["general"],
		}));
	} catch (error: any) {
		console.error(`  AI Analysis failed: ${error.message}`);
		console.error(
			`  Raw output preview: ${rawOutput ? rawOutput.substring(0, 200) : "No output"}`,
		);
		return []; // Return empty array on failure
	}
}

async function main() {
	console.log("=== STEP 2: AI-Powered Flashcard Generation ===");
	console.log(`Using model: ${MODEL}`);
	console.log("");

	const inputPath = path.join(OUTPUT_DIR, "extracted-content.json");

	if (!fs.existsSync(inputPath)) {
		console.error("Error: extracted-content.json not found.");
		console.error('Please run "npm run extract-content" first.');
		return;
	}

	const content: ExtractedContent[] = JSON.parse(
		fs.readFileSync(inputPath, "utf-8"),
	);
	console.log(`Loaded content from ${content.length} repositories`);
	console.log("");

	const allFlashcards: FlashcardData[] = [];

	// Process each repository (limit to 5 for now as requested)
	for (const repo of content.slice(0, 5)) {
		// Combine all file content for this repo
		const combinedContent = repo.files
			.map((f) => `File: ${f.path}\n${f.content}`)
			.join("\n\n---\n\n");

		if (combinedContent.length > 50) {
			const flashcards = analyzeWithAI(combinedContent, repo.repoName);
			allFlashcards.push(...flashcards);
		}
	}

	console.log(`\nTotal flashcards generated: ${allFlashcards.length}`);

	// Save flashcards
	const outputPath = path.join(OUTPUT_DIR, "generated-flashcards.json");
	fs.writeFileSync(outputPath, JSON.stringify(allFlashcards, null, 2));

	console.log(`\nFlashcards saved to: ${outputPath}`);
	console.log("\nNext steps:");
	console.log("1. Review the generated flashcards");
	console.log(
		"2. Copy the best ones to the appropriate deck files in src/data/decks/",
	);
}

main();
