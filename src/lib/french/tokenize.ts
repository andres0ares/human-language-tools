/**
 * Lightweight French tokenizer focused on elisions/clitics for vocabulary counting.
 *
 * Expands common orthographic elisions so `j'adore` → `je` + `adore`
 * (not `j` + `adore`). Ambiguous `l'` is expanded to `le` for counting;
 * true gender resolution would need a full POS tagger.
 *
 * Not a full NLP pipeline: no lemmatization, no disambiguation of
 * hyphenated imperatives beyond simple pronoun splits.
 */

/** Full-form expansions for orthographic elisions (case-insensitive match). */
const ELISION_MAP: Record<string, string> = {
  "c'": "ce",
  "d'": "de",
  "j'": "je",
  "l'": "le",
  "m'": "me",
  "n'": "ne",
  "s'": "se",
  "t'": "te",
  "qu'": "que",
  "jusqu'": "jusque",
  "lorsqu'": "lorsque",
  "puisqu'": "puisque",
  "quoiqu'": "quoique",
  "quelqu'": "quelque",
};

/** Imperative / interrogative clitics after a hyphen. */
const HYPHEN_CLITICS = new Set([
  "je",
  "tu",
  "il",
  "elle",
  "on",
  "nous",
  "vous",
  "ils",
  "elles",
  "me",
  "te",
  "se",
  "le",
  "la",
  "les",
  "lui",
  "leur",
  "y",
  "en",
  "moi",
  "toi",
  "soi",
  "ce",
]);

const ELISION_PATTERN =
  /^(c'|d'|j'|l'|m'|n'|s'|t'|qu'|jusqu'|lorsqu'|puisqu'|quoiqu'|quelqu')(.+)$/i;

/** Letters including Latin-1 French accents and internal hyphen/apostrophe. */
const TOKEN_PATTERN =
  /[A-Za-zÀ-ÖØ-öø-ÿÆŒæœ]+(?:['’][A-Za-zÀ-ÖØ-öø-ÿÆŒæœ]+)?(?:-[A-Za-zÀ-ÖØ-öø-ÿÆŒæœ]+)*/g;

function normalizeApostrophe(value: string): string {
  return value.replace(/’/g, "'");
}

function expandElision(raw: string): string[] {
  const lower = normalizeApostrophe(raw).toLowerCase();
  const match = lower.match(ELISION_PATTERN);
  if (!match) {
    return [lower];
  }

  const prefix = match[1] as keyof typeof ELISION_MAP;
  const rest = match[2];
  const expanded = ELISION_MAP[prefix];
  if (!expanded || !rest) {
    return [lower];
  }
  return [expanded, rest];
}

function splitHyphenClitics(token: string): string[] {
  if (!token.includes("-")) {
    return [token];
  }

  const parts = token.split("-");
  if (parts.length < 2) {
    return [token];
  }

  // Keep lexical compounds (peut-être, celui-ci) as one token when
  // the trailing segment is not a known clitic pronoun.
  const last = parts[parts.length - 1];
  if (!HYPHEN_CLITICS.has(last)) {
    return [token];
  }

  // donne-moi-le → donne, moi, le
  const head = parts.slice(0, -1).join("-");
  const clitics = parts.slice(1).filter((p) => HYPHEN_CLITICS.has(p));
  const nonCliticTail = parts.slice(1).filter((p) => !HYPHEN_CLITICS.has(p));

  if (nonCliticTail.length > 0) {
    return [token];
  }

  return [head, ...clitics].filter(Boolean);
}

/**
 * Tokenize French text into normalized lowercase word forms.
 */
export function tokenizeFrench(text: string): string[] {
  const tokens: string[] = [];
  const source = normalizeApostrophe(text);
  const matches = source.match(TOKEN_PATTERN) ?? [];

  for (const raw of matches) {
    for (const afterElision of expandElision(raw)) {
      for (const piece of splitHyphenClitics(afterElision)) {
        const word = piece.toLowerCase();
        if (word.length === 0) continue;
        // Skip lone letters that are not valid French words (keep a, à, y, etc. via dictionary later)
        tokens.push(word);
      }
    }
  }

  return tokens;
}

/** Tiny self-check helpers used by unit-style smoke tests. */
export function smokeTokenizeExamples(): Array<{ input: string; expected: string[] }> {
  return [
    { input: "j'adore", expected: ["je", "adore"] },
    { input: "l'école", expected: ["le", "école"] },
    { input: "qu'il", expected: ["que", "il"] },
    { input: "donne-moi", expected: ["donne", "moi"] },
    { input: "peut-être", expected: ["peut-être"] },
  ];
}
