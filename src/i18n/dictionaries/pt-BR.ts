import type { Dictionary } from "./types";

const ptBR: Dictionary = {
  meta: {
    title: "Human Language Tools",
    description:
      "Ferramentas de código aberto para aprender idiomas — começando pelo francês.",
  },
  brand: {
    name: "Human Language Tools",
    tagline: "Ferramentas abertas para estudar línguas de verdade.",
  },
  nav: {
    home: "Início",
    tools: "Ferramentas",
  },
  hub: {
    headline: "Aprenda com o texto que você lê.",
    supporting:
      "Um hub enxuto de utilitários de linguagem. A primeira ferramenta conta palavras únicas e frequências em francês.",
    cta: "Abrir contador de palavras",
    toolsHeading: "Ferramentas",
    toolsSupporting: "Mais ferramentas virão; por enquanto, o contador francês.",
    wordCounterName: "Contador de palavras (FR)",
    wordCounterBlurb:
      "Envie um livro (txt, pdf, docx, epub), veja frequências por capítulo e exporte CSV ou JSON.",
    comingSoon: "Em breve",
  },
  wordCounter: {
    title: "Contador de palavras em francês",
    subtitle:
      "Frequência e palavras únicas para o livro inteiro ou por capítulo, com validação em dicionário aberto.",
    uploadLabel: "Enviar arquivo",
    uploadHint: "Formatos: .txt, .pdf, .docx, .epub",
    analyzing: "Analisando…",
    dropHere: "Arraste o arquivo ou clique para escolher",
    scopeAll: "Livro inteiro",
    scopeChapter: "Capítulo",
    chapterLabel: "Capítulo",
    searchPlaceholder: "Filtrar palavras…",
    uniqueWords: "Palavras únicas",
    totalTokens: "Ocorrências",
    inDictionary: "No dicionário",
    unknown: "Fora do dicionário",
    word: "Palavra",
    count: "Frequência",
    status: "Status",
    exportCsv: "Exportar CSV",
    exportJson: "Exportar JSON",
    showUnknownOnly: "Só fora do dicionário",
    showKnownOnly: "Só no dicionário",
    showAll: "Todas",
    noResults: "Nenhuma palavra correspondente.",
    errorParse: "Não foi possível ler este arquivo.",
    errorEmpty: "O arquivo não contém texto legível.",
    backToHub: "Voltar ao hub",
    dictionaryNote:
      "Dicionário: an-array-of-french-words (~336k palavras, MIT).",
  },
};

export default ptBR;
