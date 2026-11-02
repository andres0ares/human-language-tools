"use client";

import { useMemo, useState, useTransition } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { AnalysisResult, FrequencyResult } from "@/types/analysis";
import { analyzeDocument } from "@/lib/french/analyze";
import { downloadCsv, downloadJson } from "@/lib/french/export";
import { ACCEPTED_EXTENSIONS, parseDocument } from "@/lib/parsers";

type Props = {
  dict: Dictionary;
};

type DictFilter = "all" | "known" | "unknown";

export function WordCounterApp({ dict }: Props) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chapterId, setChapterId] = useState<string>("__all__");
  const [query, setQuery] = useState("");
  const [dictFilter, setDictFilter] = useState<DictFilter>("all");
  const [isPending, startTransition] = useTransition();

  const activeResult: FrequencyResult | null = useMemo(() => {
    if (!analysis) return null;
    if (chapterId === "__all__") return analysis.book;
    return analysis.byChapter[chapterId] ?? analysis.book;
  }, [analysis, chapterId]);

  const filteredEntries = useMemo(() => {
    if (!activeResult) return [];
    const q = query.trim().toLowerCase();
    return activeResult.entries.filter((entry) => {
      if (dictFilter === "known" && !entry.inDictionary) return false;
      if (dictFilter === "unknown" && entry.inDictionary) return false;
      if (q && !entry.word.includes(q)) return false;
      return true;
    });
  }, [activeResult, query, dictFilter]);

  const knownCount = useMemo(() => {
    if (!activeResult) return 0;
    return activeResult.entries.filter((e) => e.inDictionary).length;
  }, [activeResult]);

  function onFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    startTransition(async () => {
      try {
        const document = await parseDocument(file);
        if (!document.fullText.trim()) {
          setAnalysis(null);
          setError(dict.wordCounter.errorEmpty);
          return;
        }
        const result = await analyzeDocument(document);
        setAnalysis(result);
        setChapterId("__all__");
        setQuery("");
        setDictFilter("all");
      } catch {
        setAnalysis(null);
        setError(dict.wordCounter.errorParse);
      }
    });
  }

  function exportBaseName() {
    const raw = analysis?.document.fileName ?? "mots";
    return raw.replace(/\.[^.]+$/, "") || "mots";
  }

  return (
    <div className="space-y-8">
      <label className="block">
        <span className="text-sm font-semibold text-ink">
          {dict.wordCounter.uploadLabel}
        </span>
        <span className="mt-1 block text-sm text-ink-soft">
          {dict.wordCounter.uploadHint}
        </span>
        <div
          className={`mt-3 rounded-md border border-dashed border-teal/40 bg-white/50 px-4 py-10 text-center transition ${
            isPending ? "opacity-70" : "hover:border-teal hover:bg-white/80"
          }`}
        >
          <input
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            className="mx-auto block w-full max-w-md cursor-pointer text-sm"
            disabled={isPending}
            onChange={(event) => onFile(event.target.files?.[0])}
          />
          <p className="mt-3 text-sm text-ink-soft">
            {isPending ? dict.wordCounter.analyzing : dict.wordCounter.dropHere}
          </p>
        </div>
      </label>

      {error ? (
        <p className="rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      {analysis && activeResult ? (
        <section className="animate-rise space-y-6">
          <div className="flex flex-wrap items-end gap-4">
            <label className="text-sm">
              <span className="mb-1 block font-semibold text-ink">
                {dict.wordCounter.chapterLabel}
              </span>
              <select
                className="rounded-md border border-foam bg-white px-3 py-2 text-ink"
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
              >
                <option value="__all__">{dict.wordCounter.scopeAll}</option>
                {analysis.document.chapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="min-w-[12rem] flex-1 text-sm">
              <span className="mb-1 block font-semibold text-ink">
                {dict.wordCounter.searchPlaceholder}
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.wordCounter.searchPlaceholder}
                className="w-full rounded-md border border-foam bg-white px-3 py-2 text-ink"
              />
            </label>

            <div className="flex flex-wrap gap-2 text-sm">
              {(
                [
                  ["all", dict.wordCounter.showAll],
                  ["known", dict.wordCounter.showKnownOnly],
                  ["unknown", dict.wordCounter.showUnknownOnly],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDictFilter(value)}
                  className={`rounded-md px-3 py-2 transition ${
                    dictFilter === value
                      ? "bg-teal text-white"
                      : "bg-white text-ink-soft hover:bg-mist"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label={dict.wordCounter.uniqueWords} value={activeResult.uniqueCount} />
            <Stat label={dict.wordCounter.totalTokens} value={activeResult.totalTokens} />
            <Stat label={dict.wordCounter.inDictionary} value={knownCount} />
            <Stat
              label={dict.wordCounter.unknown}
              value={activeResult.uniqueCount - knownCount}
            />
          </dl>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-soft"
              onClick={() =>
                downloadCsv(activeResult, `${exportBaseName()}-words.csv`)
              }
            >
              {dict.wordCounter.exportCsv}
            </button>
            <button
              type="button"
              className="rounded-md border border-ink/20 bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-mist"
              onClick={() =>
                downloadJson(activeResult, `${exportBaseName()}-words.json`)
              }
            >
              {dict.wordCounter.exportJson}
            </button>
          </div>

          <p className="text-xs text-ink-soft">{dict.wordCounter.dictionaryNote}</p>

          <div className="overflow-x-auto rounded-md border border-foam bg-white/70">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-foam bg-mist/60 text-ink-soft">
                <tr>
                  <th className="px-4 py-3 font-semibold">{dict.wordCounter.word}</th>
                  <th className="px-4 py-3 font-semibold">{dict.wordCounter.count}</th>
                  <th className="px-4 py-3 font-semibold">{dict.wordCounter.status}</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-ink-soft">
                      {dict.wordCounter.noResults}
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((entry) => (
                    <tr key={entry.word} className="border-b border-foam/70 last:border-0">
                      <td className="px-4 py-2 font-medium text-ink">{entry.word}</td>
                      <td className="px-4 py-2 tabular-nums text-ink-soft">
                        {entry.count}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={
                            entry.inDictionary ? "text-ok" : "text-danger"
                          }
                        >
                          {entry.inDictionary
                            ? dict.wordCounter.inDictionary
                            : dict.wordCounter.unknown}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-foam bg-white/60 px-4 py-3">
      <dt className="text-xs uppercase tracking-wide text-ink-soft">{label}</dt>
      <dd className="display mt-1 text-2xl text-ink">{value.toLocaleString("pt-BR")}</dd>
    </div>
  );
}
