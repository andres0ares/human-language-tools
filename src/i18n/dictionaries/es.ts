import type { Dictionary } from "./types";

/** Stub — fill with Spanish UI copy when expanding i18n. */
const es: Dictionary = {
  meta: {
    title: "Human Language Tools",
    description:
      "Herramientas de código abierto para aprender idiomas — empezando por el francés.",
  },
  brand: {
    name: "Human Language Tools",
    tagline: "Herramientas abiertas para estudiar idiomas de verdad.",
  },
  nav: {
    home: "Inicio",
    tools: "Herramientas",
  },
  hub: {
    headline: "Aprende con el texto que lees.",
    supporting:
      "Un hub ligero de utilidades lingüísticas. La primera herramienta cuenta palabras únicas y frecuencias en francés.",
    cta: "Abrir contador de palabras",
    toolsHeading: "Herramientas",
    toolsSupporting: "Vendrán más herramientas; por ahora, el contador francés.",
    wordCounterName: "Contador de palabras (FR)",
    wordCounterBlurb:
      "Sube un libro (txt, pdf, docx, epub), mira frecuencias por capítulo y exporta CSV o JSON.",
    comingSoon: "Próximamente",
  },
  wordCounter: {
    title: "Contador de palabras en francés",
    subtitle:
      "Frecuencia y palabras únicas para el libro entero o por capítulo, validadas con un diccionario abierto.",
    uploadLabel: "Subir archivo",
    uploadHint: "Formatos: .txt, .pdf, .docx, .epub",
    analyzing: "Analizando…",
    dropHere: "Arrastra un archivo o haz clic para elegir",
    scopeAll: "Libro entero",
    scopeChapter: "Capítulo",
    chapterLabel: "Capítulo",
    searchPlaceholder: "Filtrar palabras…",
    uniqueWords: "Palabras únicas",
    totalTokens: "Ocurrencias",
    inDictionary: "En el diccionario",
    unknown: "Fuera del diccionario",
    word: "Palabra",
    count: "Frecuencia",
    status: "Estado",
    exportCsv: "Exportar CSV",
    exportJson: "Exportar JSON",
    showUnknownOnly: "Solo fuera del diccionario",
    showKnownOnly: "Solo en el diccionario",
    showAll: "Todas",
    noResults: "Ninguna palabra coincidente.",
    errorParse: "No se pudo leer este archivo.",
    errorEmpty: "El archivo no tiene texto legible.",
    backToHub: "Volver al hub",
    dictionaryNote:
      "Diccionario: an-array-of-french-words (~336k palabras, MIT).",
  },
};

export default es;
