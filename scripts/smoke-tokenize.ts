import {
  smokeTokenizeExamples,
  tokenizeFrench,
} from "../src/lib/french/tokenize";

let failed = 0;

for (const { input, expected } of smokeTokenizeExamples()) {
  const actual = tokenizeFrench(input);
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(ok ? "PASS" : "FAIL", input, "→", actual, ok ? "" : `(expected ${JSON.stringify(expected)})`);
  if (!ok) failed += 1;
}

if (failed > 0) {
  process.exit(1);
}

console.log("All tokenization smoke checks passed.");
