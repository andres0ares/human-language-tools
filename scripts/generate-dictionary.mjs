import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const words = require("an-array-of-french-words");

const outDir = path.join(process.cwd(), "public", "dictionaries");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "fr-words.txt");
fs.writeFileSync(outFile, words.join("\n"), "utf8");
console.log(`Wrote ${words.length} words to ${outFile}`);
