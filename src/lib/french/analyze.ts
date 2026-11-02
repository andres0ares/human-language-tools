import type { AnalysisResult, ParsedDocument } from "@/types/analysis";
import { loadFrenchDictionary } from "./dictionary";
import { countFrequencies } from "./frequency";

export async function analyzeDocument(
  document: ParsedDocument,
): Promise<AnalysisResult> {
  const dictionary = await loadFrenchDictionary();
  const book = countFrequencies(document.fullText, dictionary);
  const byChapter: AnalysisResult["byChapter"] = {};

  for (const chapter of document.chapters) {
    byChapter[chapter.id] = countFrequencies(chapter.text, dictionary);
  }

  return { document, book, byChapter };
}
