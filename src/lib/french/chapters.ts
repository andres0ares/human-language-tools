import type { Chapter } from "@/types/analysis";

const CHAPTER_HEADING =
  /^(?:chapitre|chapter|chapitre\s+[0-9ivxlcdm]+|livre|book|partie|part)\b.*$/im;

const NUMBERED_CHAPTER =
  /^(?:chapitre|chapter|livre|book|partie|part)\s+([0-9ivxlcdm]+|[a-z])\b(.*)$/i;

const ALL_CAPS_SHORT = /^[A-ZÀ-ÖØ-Þ0-9][A-ZÀ-ÖØ-Þ0-9\s'’\-:]{2,60}$/;

function slugify(value: string, fallback: string): string {
  const base = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return base || fallback;
}

function isLikelyHeading(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 80) return false;
  if (NUMBERED_CHAPTER.test(trimmed)) return true;
  if (CHAPTER_HEADING.test(trimmed) && trimmed.length < 80) return true;
  // Short ALL-CAPS lines often mark chapter titles in plain-text books
  if (ALL_CAPS_SHORT.test(trimmed) && /[A-ZÀ-ÖØ-Þ]{3,}/.test(trimmed)) {
    return true;
  }
  return false;
}

/**
 * Heuristic chapter splitter for plain text (txt/pdf/docx).
 * EPUB parsers should prefer spine/toc structure and call this only as fallback.
 */
export function detectChapters(text: string, fileName = "document"): Chapter[] {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n");

  const headingIndexes: number[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (isLikelyHeading(lines[i]!)) {
      headingIndexes.push(i);
    }
  }

  // Too many false positives → treat as a single chapter
  if (headingIndexes.length < 2 || headingIndexes.length > 200) {
    const body = normalized.trim();
    return [
      {
        id: "chapter-1",
        title: fileName,
        text: body,
        order: 1,
      },
    ];
  }

  const chapters: Chapter[] = [];

  // Preface before first heading
  if (headingIndexes[0]! > 0) {
    const preface = lines.slice(0, headingIndexes[0]).join("\n").trim();
    if (preface.length > 40) {
      chapters.push({
        id: "preface",
        title: "Préface / début",
        text: preface,
        order: 0,
      });
    }
  }

  for (let h = 0; h < headingIndexes.length; h += 1) {
    const start = headingIndexes[h]!;
    const end = headingIndexes[h + 1] ?? lines.length;
    const title = lines[start]!.trim();
    const body = lines.slice(start + 1, end).join("\n").trim();
    const order = chapters.length + 1;
    chapters.push({
      id: slugify(title, `chapter-${order}`),
      title,
      text: body.length > 0 ? `${title}\n${body}` : title,
      order,
    });
  }

  // Deduplicate ids
  const seen = new Map<string, number>();
  for (const chapter of chapters) {
    const count = seen.get(chapter.id) ?? 0;
    seen.set(chapter.id, count + 1);
    if (count > 0) {
      chapter.id = `${chapter.id}-${count + 1}`;
    }
  }

  return chapters.filter((c) => c.text.trim().length > 0);
}

export function chaptersFromSections(
  sections: Array<{ title: string; text: string }>,
  fallbackTitle: string,
): Chapter[] {
  if (sections.length === 0) {
    return [];
  }

  const usable = sections.filter((s) => s.text.trim().length > 0);
  if (usable.length === 0) {
    return [];
  }

  // If EPUB only yielded one blob, try heuristic split
  if (usable.length === 1) {
    return detectChapters(usable[0]!.text, usable[0]!.title || fallbackTitle);
  }

  return usable.map((section, index) => ({
    id: slugify(section.title || `chapter-${index + 1}`, `chapter-${index + 1}`),
    title: section.title || `${fallbackTitle} ${index + 1}`,
    text: section.text,
    order: index + 1,
  }));
}
