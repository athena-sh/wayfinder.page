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

// Test all 15 headlines
const headlines = [
	"Never Check a Bag Again: The Ultra-Light Packing Revolution", // Original
	"I Spent $2,000 Learning Why Checked Bags Are a Scam (Here's How to Never Check Again)",
	"The 7-Minute Airport Hack That Saves You Hours of Baggage Claim Hell",
	"Why Smart Travelers Never Check Bags (And How You Can Join Them)",
	"This One Packing Mistake Cost Me 17 Hours of Travel Nightmare",
	"How I Escaped Baggage Claim Forever With These 15 Ultra-Light Essentials",
	"Airlines Don't Want You to Know These 10 Carry-On Secrets",
	"The $50 Mistake 90% of Travelers Make (And How to Avoid It)",
	"I Tested 25 Travel Hacks – These 8 Will Transform Your Airport Experience",
	"Why Checking Bags Is Financial Suicide (And What to Pack Instead)",
	"The 5-Minute Packing Method That Eliminates Baggage Fees Forever",
	"This Travel Disaster Taught Me the $2,000 Lesson About Carry-On Only",
	"How to Beat Airlines at Their Own Game (Without Checking a Single Bag)",
	"The Shocking Math Behind Checked Bags (Plus My Ultimate Packing List)",
	"From Baggage Claim Victim to Carry-On Master: My Complete Guide",
];

console.log("HEADLINE ANALYSIS RESULTS - ALL 15 OPTIONS\n" + "=".repeat(60));

// Sort by score for easy comparison
const results = headlines
	.map((headline, i) => ({
		index: i + 1,
		headline,
		...analyzeHeadline(headline),
	}))
	.sort((a, b) => b.score - a.score);

results.forEach((result, rank) => {
	console.log(
		`\n${rank + 1}. SCORE: ${result.score}/100 - "${result.headline}"`,
	);
	console.log(
		`   Power: ${result.powerPct}% | Emotional: ${result.emotionalPct}% | Length: ${result.charLength} chars | Numbers: ${result.hasNumbers ? "Yes" : "No"}`,
	);
});

console.log(`\n${"=".repeat(60)}`);
console.log("TOP 3 PERFORMERS:");
console.log(`1st: ${results[0].score}/100 - "${results[0].headline}"`);
console.log(`2nd: ${results[1].score}/100 - "${results[1].headline}"`);
console.log(`3rd: ${results[2].score}/100 - "${results[2].headline}"`);
