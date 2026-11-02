import type { SupportedLocale } from "@/types/analysis";
import type { Dictionary } from "./dictionaries/types";
import { defaultLocale } from "./config";

const loaders: Record<SupportedLocale, () => Promise<Dictionary>> = {
  "pt-BR": () => import("./dictionaries/pt-BR").then((m) => m.default),
  fr: () => import("./dictionaries/fr").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
  es: () => import("./dictionaries/es").then((m) => m.default),
};

export async function getDictionary(
  locale: SupportedLocale = defaultLocale,
): Promise<Dictionary> {
  const load = loaders[locale] ?? loaders[defaultLocale];
  return load();
}

export type { Dictionary };
