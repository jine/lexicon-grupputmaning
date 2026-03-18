import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
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
const MODEL = "opencode/mimo-v2-flash-free";

/**
 * Runs opencode with a single-line prompt.
 * Removed --format json to rely on prompt instructions.
 */
function runOpenCodeSingleLine(prompt: string): string {
	const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-"));
	console.log(`  Running opencode in isolated temp dir: ${tempDir}`);

	try {
		// Compress prompt to single line
		const compressedPrompt = prompt.replace(/\s+/g, " ").trim();

		// Arguments: opencode run --model <model> --dir <dir> "<prompt>"
		// Removed --format json
		const args = ["run", "--model", MODEL, "--dir", tempDir, compressedPrompt];

		console.log(
			`  Executing: opencode run --model ${MODEL} --dir ... "<prompt>"`,
		);

		const result = spawnSync("opencode", args, {
			encoding: "utf-8",
			maxBuffer: 20 * 1024 * 1024,
			timeout: 45000,
			killSignal: "SIGKILL",
			windowsVerbatimArguments: true,
		});

		// Clean up
		try {
			fs.rmdirSync(tempDir);
		} catch (e) {}

		if (result.error) throw result.error;
		if (result.status !== 0) {
			console.error(`  [DEBUG] Opencode exited with code ${result.status}`);
			console.error(`  [DEBUG] Stderr: ${result.stderr}`);
		}

		return result.stdout || "";
	} catch (error: unknown) {
		console.error(
			`  Error running opencode: ${error instanceof Error ? error.message : String(error)}`,
		);
		throw error;
	}
}

/**
 * Extracts JSON array from text output.
 */
function extractJsonFromOutput(output: string): unknown[] {
	// 1. Remove ANSI escape codes
	const ansiRegex = /\\x1b\[[0-9;]*[mGKJH]/g;
	const cleanOutput = output.replace(ansiRegex, "");

	console.log(`  [DEBUG] Cleaned output length: ${cleanOutput.length}`);
	console.log(`  [DEBUG] Output preview: ${cleanOutput.substring(0, 300)}...`);

	// 2. Find JSON array pattern
	const startIndex = cleanOutput.indexOf("[");
	if (startIndex === -1) {
		console.log(`  [DEBUG] No '[' found in output`);
		throw new Error("No JSON array start found");
	}

	let braceCount = 0;
	let endIndex = -1;

	for (let i = startIndex; i < cleanOutput.length; i++) {
		if (cleanOutput[i] === "[") braceCount++;
		else if (cleanOutput[i] === "]") {
			braceCount--;
			if (braceCount === 0) {
				endIndex = i;
				break;
			}
		}
	}

	if (endIndex === -1) {
		console.log(`  [DEBUG] No matching ']' found`);
		throw new Error("No matching closing bracket");
	}

	const jsonString = cleanOutput.substring(startIndex, endIndex + 1);
	console.log(`  [DEBUG] Extracted JSON length: ${jsonString.length}`);

	try {
		return JSON.parse(jsonString);
	} catch (e: any) {
		console.log(`  [DEBUG] Failed to parse JSON: ${e.message}`);
		console.log(`  [DEBUG] JSON snippet: ${jsonString.substring(0, 200)}...`);
		throw e;
	}
}

async function analyzeWithAI(
	content: string,
	repoName: string,
): Promise<FlashcardData[]> {
	console.log(`  Analyzing ${repoName} with AI...`);

	const truncatedContent = content.substring(0, 4000);

	// Updated prompt with strict instructions
	const prompt = `
Du är en expert på att skapa tekniska flashcards.
Generera 3 till 5 flashcards baserat på följande text från ett GitHub-repo.

INSTRUKTIONER:
1. Analysera koden/texten och identifiera viktiga koncept (React, CSS, Agile, etc.)
2. Skapa flashcards på SVENSKA.
3. Output MÅSTE vara en giltig JSON-array utan någon annan text eller förklaringar.
4. Varje flashcard måste ha fälten: "question", "answer", "difficulty" ("easy", "medium", "hard"), och "tags" (array av strängar).
5. RETURNERA ENDAST JSON-ARRAYEN. INGA ANDRA TEXT ELLER MARKDOWN.

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

	try {
		const rawOutput = runOpenCodeSingleLine(prompt);
		const flashcardsData = extractJsonFromOutput(rawOutput);

		if (!Array.isArray(flashcardsData)) {
			throw new Error("Extracted data is not an array");
		}

		return flashcardsData.map((fc) => {
			const fcRecord = fc as Record<string, unknown>;
			return {
				repoName,
				topic: "General",
				question: String(
					fcRecord.question || fcRecord.fråga || "Unknown Question",
				),
				answer: String(fcRecord.answer || fcRecord.svar || "Unknown Answer"),
				difficulty: (() => {
					const diff = String(fcRecord.difficulty || "").toLowerCase();
					if (diff === "easy" || diff === "enkel") return "easy";
					if (diff === "hard" || diff === "svår") return "hard";
					return "medium";
				})(),
				tags: Array.isArray(fcRecord.tags) ? fcRecord.tags : ["general"],
			};
		});
	} catch (error: unknown) {
		console.error(
			`  AI Analysis failed: ${error instanceof Error ? error.message : String(error)}`,
		);
		return [];
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

	for (const repo of content.slice(0, 5)) {
		const combinedContent = repo.files
			.map((f) => `File: ${f.path}\n${f.content}`)
			.join("\n\n---\n\n");

		if (combinedContent.length > 50) {
			const flashcards = await analyzeWithAI(combinedContent, repo.repoName);
			allFlashcards.push(...flashcards);
		}
	}

	console.log(`\nTotal flashcards generated: ${allFlashcards.length}`);

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
