export type SupportedLocale = "pt-BR" | "fr" | "en" | "es";

export type Chapter = {
  id: string;
  title: string;
  text: string;
  order: number;
};

export type ParsedDocument = {
  fileName: string;
  format: "txt" | "pdf" | "docx" | "epub";
  chapters: Chapter[];
  fullText: string;
};

export type WordEntry = {
  word: string;
  count: number;
  inDictionary: boolean;
};

export type FrequencyResult = {
  uniqueCount: number;
  totalTokens: number;
  entries: WordEntry[];
};

export type AnalysisResult = {
  document: ParsedDocument;
  book: FrequencyResult;
  byChapter: Record<string, FrequencyResult>;
};
