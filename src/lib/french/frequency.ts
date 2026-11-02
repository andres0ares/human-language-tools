import type { FrequencyResult, WordEntry } from "@/types/analysis";
import { isInDictionary } from "./dictionary";
import { tokenizeFrench } from "./tokenize";

export function countFrequencies(
  text: string,
  dictionary: Set<string>,
): FrequencyResult {
  const tokens = tokenizeFrench(text);
  const counts = new Map<string, number>();

  for (const token of tokens) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }

  const entries: WordEntry[] = Array.from(counts.entries())
    .map(([word, count]) => ({
      word,
      count,
      inDictionary: isInDictionary(word, dictionary),
    }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word, "fr"));

  return {
    uniqueCount: entries.length,
    totalTokens: tokens.length,
    entries,
  };
}
