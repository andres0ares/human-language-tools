import type { SupportedLocale } from "@/types/analysis";

export const defaultLocale: SupportedLocale = "pt-BR";

export const locales: SupportedLocale[] = ["pt-BR", "fr", "en", "es"];

export const localeLabels: Record<SupportedLocale, string> = {
  "pt-BR": "Português (Brasil)",
  fr: "Français",
  en: "English",
  es: "Español",
};
