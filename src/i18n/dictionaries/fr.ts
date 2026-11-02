import type { Dictionary } from "./types";

/** Stub — fill with French UI copy when expanding i18n. */
const fr: Dictionary = {
  meta: {
    title: "Human Language Tools",
    description:
      "Outils open source pour l’apprentissage des langues — à commencer par le français.",
  },
  brand: {
    name: "Human Language Tools",
    tagline: "Des outils ouverts pour étudier de vraies langues.",
  },
  nav: {
    home: "Accueil",
    tools: "Outils",
  },
  hub: {
    headline: "Apprenez avec le texte que vous lisez.",
    supporting:
      "Un hub léger d’utilitaires linguistiques. Le premier outil compte les mots uniques et les fréquences en français.",
    cta: "Ouvrir le compteur de mots",
    toolsHeading: "Outils",
    toolsSupporting: "D’autres outils suivront ; pour l’instant, le compteur français.",
    wordCounterName: "Compteur de mots (FR)",
    wordCounterBlurb:
      "Importez un livre (txt, pdf, docx, epub), voyez les fréquences par chapitre et exportez en CSV ou JSON.",
    comingSoon: "Bientôt",
  },
  wordCounter: {
    title: "Compteur de mots français",
    subtitle:
      "Fréquences et mots uniques pour tout le livre ou par chapitre, validés contre un dictionnaire ouvert.",
    uploadLabel: "Envoyer un fichier",
    uploadHint: "Formats : .txt, .pdf, .docx, .epub",
    analyzing: "Analyse…",
    dropHere: "Déposez un fichier ou cliquez pour choisir",
    scopeAll: "Livre entier",
    scopeChapter: "Chapitre",
    chapterLabel: "Chapitre",
    searchPlaceholder: "Filtrer les mots…",
    uniqueWords: "Mots uniques",
    totalTokens: "Occurrences",
    inDictionary: "Dans le dictionnaire",
    unknown: "Hors dictionnaire",
    word: "Mot",
    count: "Fréquence",
    status: "Statut",
    exportCsv: "Exporter CSV",
    exportJson: "Exporter JSON",
    showUnknownOnly: "Hors dictionnaire seulement",
    showKnownOnly: "Dans le dictionnaire seulement",
    showAll: "Tous",
    noResults: "Aucun mot correspondant.",
    errorParse: "Impossible de lire ce fichier.",
    errorEmpty: "Le fichier ne contient pas de texte lisible.",
    backToHub: "Retour au hub",
    dictionaryNote:
      "Dictionnaire : an-array-of-french-words (~336k mots, MIT).",
  },
};

export default fr;
