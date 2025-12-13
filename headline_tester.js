#!/usr/bin/env node

// Extracted from headline.byburk.net
const powerWords = [
	"ultimate",
	"essential",
	"perfect",
	"best",
	"top",
	"greatest",
	"amazing",
	"incredible",
	"proven",
	"guaranteed",
	"effective",
	"powerful",
	"complete",
	"comprehensive",
	"definitive",
	"exclusive",
	"limited",
	"bonus",
	"free",
	"instant",
	"quick",
	"easy",
	"simple",
	"effortless",
	"revolutionary",
	"breakthrough",
	"innovative",
	"cutting-edge",
	"advanced",
	"premium",
	"professional",
	"expert",
	"master",
	"genius",
	"brilliant",
	"smart",
	"clever",
	"strategic",
	"tactical",
	"transform",
	"boost",
	"skyrocket",
	"explode",
	"maximize",
	"optimize",
	"supercharge",
	"amplify",
	"discover",
	"reveal",
	"uncover",
	"expose",
	"unlock",
	"unleash",
	"master",
	"dominate",
	"insider",
	"secret",
	"hidden",
	"underground",
	"confidential",
	"exclusive",
	"private",
	"blueprint",
	"formula",
	"system",
	"framework",
	"method",
	"strategy",
	"technique",
	"hack",
	"viral",
	"trending",
	"popular",
	"hot",
	"breaking",
	"latest",
	"new",
	"fresh",
	"critical",
	"crucial",
	"vital",
	"important",
	"necessary",
	"must-have",
	"essential",
	"shocking",
	"stunning",
	"remarkable",
	"extraordinary",
	"phenomenal",
	"outstanding",
	"exceptional",
	"massive",
	"huge",
	"enormous",
	"giant",
	"epic",
	"legendary",
	"monumental",
	"insane",
	"crazy",
	"wild",
	"extreme",
	"intense",
	"radical",
	"aggressive",
	"mistakes",
	"errors",
	"fails",
	"problems",
	"issues",
	"challenges",
	"obstacles",
];

const emotionalWords = [
	"mysterious",
	"hidden",
	"secret",
	"unknown",
	"surprising",
	"unexpected",
	"strange",
	"weird",
	"curious",
	"intriguing",
	"fascinating",
	"puzzling",
	"confusing",
	"baffling",
	"urgent",
	"now",
	"today",
	"immediately",
	"hurry",
	"quick",
	"fast",
	"deadline",
	"limited",
	"expiring",
	"ending",
	"last",
	"final",
	"closing",
	"panic",
	"fear",
	"danger",
	"warning",
	"alert",
	"caution",
	"risk",
	"threat",
	"avoid",
	"mistake",
	"fail",
	"lose",
	"miss",
	"regret",
	"worry",
	"concern",
	"problem",
	"craving",
	"obsessed",
	"addicted",
	"love",
	"want",
	"need",
	"desire",
	"dream",
	"wish",
	"fortune",
	"wealth",
	"rich",
	"money",
	"profit",
	"gain",
	"win",
	"success",
	"happy",
	"joy",
	"excited",
	"thrilled",
	"delighted",
	"amazing",
	"wonderful",
	"fantastic",
];

function analyzeHeadline(text) {
	const words = text.toLowerCase().split(/\s+/);
	const wordCount = words.length;

	// Power words analysis
	const powerWordCount = words.filter((word) =>
		powerWords.includes(word),
	).length;
	const powerPct = Math.min((powerWordCount / wordCount) * 100, 100);

	// Emotional words analysis
	const emotionalWordCount = words.filter((word) =>
		emotionalWords.includes(word),
	).length;
	const emotionalPct = Math.min((emotionalWordCount / wordCount) * 100, 100);

	// Numbers check
	const hasNumbers = /\d/.test(text);
	const numberScore = hasNumbers ? 20 : 0;

	// Length optimization (50-60 chars is ideal)
	const charLength = text.length;
	let lengthScore = 0;
	if (charLength >= 50 && charLength <= 60) lengthScore = 25;
	else if (charLength >= 40 && charLength <= 70) lengthScore = 15;
	else if (charLength >= 30 && charLength <= 80) lengthScore = 10;

	// Question mark bonus
	const hasQuestion = text.includes("?");
	const questionScore = hasQuestion ? 10 : 0;

	// Brackets/parentheses bonus
	const hasBrackets = /[()[\]]/.test(text);
	const bracketScore = hasBrackets ? 10 : 0;

	// Calculate total score
	const totalScore = Math.min(
		Math.round(
			powerPct * 0.3 +
				emotionalPct * 0.3 +
				numberScore +
				lengthScore +
				questionScore +
				bracketScore,
		),
		100,
	);

	return {
		score: totalScore,
		powerPct: Math.round(powerPct),
		emotionalPct: Math.round(emotionalPct),
		hasNumbers,
		charLength,
		wordCount,
		details: {
			powerWords: powerWordCount,
			emotionalWords: emotionalWordCount,
			lengthScore,
			numberScore,
			questionScore,
			bracketScore,
		},
	};
}

// Test headlines
const headlines = [
	"Never Check a Bag Again: The Ultra-Light Packing Revolution",
	"I Spent $2,000 Learning Why Checked Bags Are a Scam (Here's How to Never Check Again)",
	"The 7-Minute Airport Hack That Saves You Hours of Baggage Claim Hell",
	"Why Smart Travelers Never Check Bags (And How You Can Join Them)",
	"This One Packing Mistake Cost Me 17 Hours of Travel Nightmare",
];

console.log("HEADLINE ANALYSIS RESULTS\n" + "=".repeat(50));

headlines.forEach((headline, i) => {
	const result = analyzeHeadline(headline);
	console.log(`\n${i + 1}. "${headline}"`);
	console.log(`   Score: ${result.score}/100`);
	console.log(
		`   Power: ${result.powerPct}% | Emotional: ${result.emotionalPct}% | Length: ${result.charLength} chars`,
	);
	console.log(
		`   Numbers: ${result.hasNumbers ? "Yes" : "No"} | Words: ${result.wordCount}`,
	);
});
