/**
 * STEP 2: AI-Powered Flashcard Generation using opencode local model
 *
 * This script analyzes extracted content using the MiMo V2 Flash Free model
 * running locally via opencode.
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

/**
 * Uses opencode with MiMo V2 Flash Free model to analyze content and generate flashcards
 */
function analyzeWithAI(content: string, repoName: string): FlashcardData[] {
	console.log(`  Analyzing content from ${repoName} with AI...`);

	// Create a prompt for the AI
	const prompt = `
Analyze the following content from a GitHub repository and generate flashcards in Swedish.
Content is from repo: ${repoName}

Content:
${content.substring(0, 3000)}...

Instructions:
1. Identify key programming concepts, technologies, or concepts mentioned
2. For each concept, create a flashcard with:
   - question: A clear question in Swedish about the concept
   - answer: A detailed explanation in Swedish
   - difficulty: easy, medium, or hard
   - tags: Relevant tags (react, css, git, javascript, etc.)
3. Return ONLY valid JSON array of flashcards
4. Max 5 flashcards per repo

Example format:
[
  {
    "question": "Vad är React hooks och varför används de?",
    "answer": "React hooks är funktioner som låter dig använda state och andra React-funktioner i funktionella komponenter...",
    "difficulty": "medium",
    "tags": ["react", "hooks"]
  }
]
`;

	try {
		// Create a temporary directory to isolate opencode from AGENTS.md
		const tempDir = path.join(__dirname, "temp-opencode-isolated");
		if (!fs.existsSync(tempDir)) {
			fs.mkdirSync(tempDir, { recursive: true });
		}

		// Write prompt to a file in the temp directory
		const tempPromptPath = path.join(tempDir, "prompt.txt");
		fs.writeFileSync(tempPromptPath, prompt);

		// Run opencode in the isolated directory using --dir flag
		// The --dir flag tells opencode to run in a specific directory, isolating it from AGENTS.md
		const command = `opencode run --model opencode/mimo-v2-flash-free --dir "${tempDir}"`;
		const output = execSync(command, {
			input: prompt,
			encoding: "utf-8",
			maxBuffer: 1024 * 1024 * 10,
		});

		// Clean up
		fs.unlinkSync(tempPromptPath);
		try {
			fs.rmdirSync(tempDir);
		} catch (e) {
			// Ignore if directory not empty
		}

		// Parse the AI response
		try {
			const flashcards = JSON.parse(output);
			if (Array.isArray(flashcards)) {
				return flashcards.map((fc: Record<string, unknown>) => ({
					repoName,
					topic: "General",
					question:
						(fc.question as string) || (fc.fråga as string) || "Unknown",
					answer: (fc.answer as string) || (fc.svar as string) || "Unknown",
					difficulty: (fc.difficulty as "easy" | "medium" | "hard") || "medium",
					tags: (fc.tags as string[]) || [],
				}));
			}
		} catch (_parseError) {
			console.log(
				"  Could not parse AI response as JSON, trying simple extraction...",
			);
		}

		// Fallback: Simple extraction from AI response
		return extractSimpleFlashcards(output, repoName);
	} catch (error: unknown) {
		console.log(`  AI analysis failed: ${(error as Error).message}`);
		console.log("  Falling back to simple pattern matching...");
		return [];
	}
}

function extractSimpleFlashcards(
	aiResponse: string,
	repoName: string,
): FlashcardData[] {
	const flashcards: FlashcardData[] = [];
	const lines = aiResponse.split("\n");

	let currentQuestion = "";
	let currentAnswer = "";

	for (const line of lines) {
		if (line.includes("?") && line.length > 10) {
			if (currentQuestion && currentAnswer) {
				flashcards.push({
					repoName,
					topic: "General",
					question: currentQuestion,
					answer: currentAnswer,
					difficulty: "medium",
					tags: ["general"],
				});
			}
			currentQuestion = line.trim();
			currentAnswer = "";
		} else if (line.length > 20 && !line.includes("---")) {
			currentAnswer += `${line.trim()} `;
		}
	}

	return flashcards.slice(0, 3); // Limit to 3 cards
}

async function main() {
	console.log("=== STEP 2: AI-Powered Flashcard Generation ===");
	console.log("Using opencode with MiMo V2 Flash Free model");
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

	// Process each repository
	for (const repo of content.slice(0, 5)) {
		// Combine all file content for this repo
		const combinedContent = repo.files
			.map((f) => f.content)
			.join("\n\n---\n\n");

		if (combinedContent.length > 100) {
			const flashcards = analyzeWithAI(combinedContent, repo.repoName);
			allFlashcards.push(...flashcards);
		}
	}

	console.log(`\nGenerated ${allFlashcards.length} flashcards`);

	// Save flashcards
	const outputPath = path.join(OUTPUT_DIR, "generated-flashcards.json");
	fs.writeFileSync(outputPath, JSON.stringify(allFlashcards, null, 2));

	console.log(`\nFlashcards saved to: ${outputPath}`);
	console.log("\nNext steps:");
	console.log("1. Review the generated flashcards");
	console.log(
		"2. Copy the best ones to the appropriate deck files in src/data/decks/",
	);
	console.log("3. Run 'npm run build' to verify everything works");
}

main();
