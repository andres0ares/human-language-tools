import type { Dictionary } from "./types";

/** Stub — fill with English copy when expanding i18n. */
const en: Dictionary = {
  meta: {
    title: "Human Language Tools",
    description: "Open-source tools for language learning — starting with French.",
  },
  brand: {
    name: "Human Language Tools",
    tagline: "Open tools for studying real languages.",
  },
  nav: {
    home: "Home",
    tools: "Tools",
  },
  hub: {
    headline: "Learn from the text you read.",
    supporting:
      "A lean hub of language utilities. The first tool counts unique words and frequencies in French.",
    cta: "Open word counter",
    toolsHeading: "Tools",
    toolsSupporting: "More tools will follow; for now, the French counter.",
    wordCounterName: "Word counter (FR)",
    wordCounterBlurb:
      "Upload a book (txt, pdf, docx, epub), see per-chapter frequencies, and export CSV or JSON.",
    comingSoon: "Coming soon",
  },
  wordCounter: {
    title: "French word counter",
    subtitle:
      "Frequency and unique words for the whole book or per chapter, validated against an open dictionary.",
    uploadLabel: "Upload file",
    uploadHint: "Formats: .txt, .pdf, .docx, .epub",
    analyzing: "Analyzing…",
    dropHere: "Drop a file or click to choose",
    scopeAll: "Whole book",
    scopeChapter: "Chapter",
    chapterLabel: "Chapter",
    searchPlaceholder: "Filter words…",
    uniqueWords: "Unique words",
    totalTokens: "Occurrences",
    inDictionary: "In dictionary",
    unknown: "Not in dictionary",
    word: "Word",
    count: "Frequency",
    status: "Status",
    exportCsv: "Export CSV",
    exportJson: "Export JSON",
    showUnknownOnly: "Not in dictionary only",
    showKnownOnly: "In dictionary only",
    showAll: "All",
    noResults: "No matching words.",
    errorParse: "Could not read this file.",
    errorEmpty: "The file has no readable text.",
    backToHub: "Back to hub",
    dictionaryNote:
      "Dictionary: an-array-of-french-words (~336k words, MIT).",
  },
};

export default en;
