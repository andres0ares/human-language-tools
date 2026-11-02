import type { ParsedDocument } from "@/types/analysis";
import { chaptersFromSections, detectChapters } from "@/lib/french/chapters";
import { parseDocx } from "./docx";
import { parseEpub } from "./epub";
import { parsePdf } from "./pdf";
import { parseTxt } from "./txt";

function extensionOf(fileName: string): string {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? parts[parts.length - 1]! : "";
}

export async function parseDocument(file: File): Promise<ParsedDocument> {
  const ext = extensionOf(file.name);

  if (ext === "txt") {
    const fullText = await parseTxt(file);
    return {
      fileName: file.name,
      format: "txt",
      fullText,
      chapters: detectChapters(fullText, file.name),
    };
  }

  if (ext === "pdf") {
    const fullText = await parsePdf(file);
    return {
      fileName: file.name,
      format: "pdf",
      fullText,
      chapters: detectChapters(fullText, file.name),
    };
  }

  if (ext === "docx") {
    const fullText = await parseDocx(file);
    return {
      fileName: file.name,
      format: "docx",
      fullText,
      chapters: detectChapters(fullText, file.name),
    };
  }

  if (ext === "epub") {
    const { text, sections } = await parseEpub(file);
    return {
      fileName: file.name,
      format: "epub",
      fullText: text,
      chapters: chaptersFromSections(sections, file.name),
    };
  }

  throw new Error(`Unsupported format: .${ext || "?"}`);
}

export const ACCEPTED_EXTENSIONS = ".txt,.pdf,.docx,.epub";
export const ACCEPTED_MIME_HINT =
  "text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/epub+zip";
