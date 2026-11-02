/** Shape shared by all UI locales — string values, not literal pt-BR copy. */
export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    tagline: string;
  };
  nav: {
    home: string;
    tools: string;
  };
  hub: {
    headline: string;
    supporting: string;
    cta: string;
    toolsHeading: string;
    toolsSupporting: string;
    wordCounterName: string;
    wordCounterBlurb: string;
    comingSoon: string;
  };
  wordCounter: {
    title: string;
    subtitle: string;
    uploadLabel: string;
    uploadHint: string;
    analyzing: string;
    dropHere: string;
    scopeAll: string;
    scopeChapter: string;
    chapterLabel: string;
    searchPlaceholder: string;
    uniqueWords: string;
    totalTokens: string;
    inDictionary: string;
    unknown: string;
    word: string;
    count: string;
    status: string;
    exportCsv: string;
    exportJson: string;
    showUnknownOnly: string;
    showKnownOnly: string;
    showAll: string;
    noResults: string;
    errorParse: string;
    errorEmpty: string;
    backToHub: string;
    dictionaryNote: string;
  };
};
