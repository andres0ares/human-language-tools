import JSZip from "jszip";

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function resolvePath(base: string, relative: string): string {
  if (!relative) return base;
  if (relative.startsWith("/")) return relative.replace(/^\//, "");
  const baseParts = base.split("/").slice(0, -1);
  for (const part of relative.split("/")) {
    if (part === "..") baseParts.pop();
    else if (part !== ".") baseParts.push(part);
  }
  return baseParts.join("/");
}

export type EpubSection = { title: string; text: string };

export async function parseEpub(
  file: File,
): Promise<{ text: string; sections: EpubSection[] }> {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());

  const containerXml = await zip.file("META-INF/container.xml")?.async("text");
  if (!containerXml) {
    throw new Error("Invalid EPUB: missing container.xml");
  }

  const rootMatch = containerXml.match(/full-path="([^"]+)"/i);
  if (!rootMatch?.[1]) {
    throw new Error("Invalid EPUB: missing rootfile path");
  }

  const opfPath = rootMatch[1];
  const opfXml = await zip.file(opfPath)?.async("text");
  if (!opfXml) {
    throw new Error("Invalid EPUB: missing OPF package");
  }

  const manifest = new Map<string, { href: string; mediaType: string }>();
  const itemRegex =
    /<item\b[^>]*\bid="([^"]+)"[^>]*>/gi;
  let itemMatch: RegExpExecArray | null;
  while ((itemMatch = itemRegex.exec(opfXml)) !== null) {
    const tag = itemMatch[0];
    const id = itemMatch[1]!;
    const href = tag.match(/href="([^"]+)"/i)?.[1];
    const mediaType = tag.match(/media-type="([^"]+)"/i)?.[1] ?? "";
    if (href) {
      manifest.set(id, { href, mediaType });
    }
  }

  const spineIds: string[] = [];
  const spineRegex = /<itemref\b[^>]*\bidref="([^"]+)"[^>]*>/gi;
  let spineMatch: RegExpExecArray | null;
  while ((spineMatch = spineRegex.exec(opfXml)) !== null) {
    spineIds.push(spineMatch[1]!);
  }

  const sections: EpubSection[] = [];

  for (const id of spineIds) {
    const entry = manifest.get(id);
    if (!entry) continue;
    if (
      entry.mediaType &&
      !entry.mediaType.includes("html") &&
      !entry.mediaType.includes("xml")
    ) {
      continue;
    }

    const fullPath = resolvePath(opfPath, entry.href);
    const html = await zip.file(fullPath)?.async("text");
    if (!html) continue;

    const title =
      html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ||
      html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() ||
      entry.href.split("/").pop() ||
      id;

    const text = stripHtml(html);
    if (text.length > 0) {
      sections.push({ title, text });
    }
  }

  return {
    text: sections.map((s) => s.text).join("\n\n"),
    sections,
  };
}
