import type { FrequencyResult, WordEntry } from "@/types/analysis";

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function entriesToCsv(entries: WordEntry[]): string {
  const header = "word,count,in_dictionary";
  const rows = entries.map(
    (e) =>
      `${csvEscape(e.word)},${e.count},${e.inDictionary ? "true" : "false"}`,
  );
  return [header, ...rows].join("\n");
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function downloadCsv(result: FrequencyResult, fileName: string) {
  const csv = entriesToCsv(result.entries);
  downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), fileName);
}

export function downloadJson(result: FrequencyResult, fileName: string) {
  const payload = {
    uniqueCount: result.uniqueCount,
    totalTokens: result.totalTokens,
    words: result.entries,
  };
  downloadBlob(
    new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json;charset=utf-8",
    }),
    fileName,
  );
}
