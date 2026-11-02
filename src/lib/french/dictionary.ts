let cached: Set<string> | null = null;
let loading: Promise<Set<string>> | null = null;

/**
 * Load the MIT French word list from /public/dictionaries/fr-words.txt
 * (generated from `an-array-of-french-words`).
 */
export async function loadFrenchDictionary(): Promise<Set<string>> {
  if (cached) return cached;
  if (loading) return loading;

  loading = (async () => {
    const response = await fetch("/dictionaries/fr-words.txt");
    if (!response.ok) {
      throw new Error(`Dictionary HTTP ${response.status}`);
    }
    const text = await response.text();
    const set = new Set<string>();
    for (const line of text.split("\n")) {
      const word = line.trim().toLowerCase();
      if (word) set.add(word);
    }
    cached = set;
    return set;
  })();

  try {
    return await loading;
  } finally {
    loading = null;
  }
}

export function isInDictionary(word: string, dictionary: Set<string>): boolean {
  return dictionary.has(word.toLowerCase());
}
