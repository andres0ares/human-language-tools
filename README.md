# Human Language Tools

Open-source hub of language-learning utilities. First tool: a **French unique-word / frequency counter**.

UI i18n is structured for `pt-BR`, `fr`, `en`, and `es`. **pt-BR is the default** for this MVP; other locales have stub dictionaries ready to expand.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Client-side parsing (Vercel-friendly): `mammoth` (docx), `pdfjs-dist` (pdf), `jszip` (epub)
- French dictionary: [`an-array-of-french-words`](https://github.com/words/an-array-of-french-words) (**MIT**, ~336k lowercased words)

## Run locally

Requires **64-bit Node.js ≥ 20** (native CSS tooling needs x64 on Windows; the 32-bit Node from `Program Files (x86)` will fail the build).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

```bash
npm run smoke        # French tokenization checks (j'adore → je + adore)
npm run dictionary   # regenerate public/dictionaries/fr-words.txt
npm run build        # production build
```

## French word counter

Route: `/tools/compteur-mots`

- Upload: `.txt`, `.pdf`, `.docx`, `.epub`
- Counts word frequency for the whole book and per chapter
- Lists unique words with filters (book/chapter, dictionary status, search)
- Export: CSV and JSON
- Validates tokens against the bundled MIT French word list

### Tokenization notes

Elisions/clitics are expanded with a small rule table, e.g. `j'adore` → `je` + `adore`. Ambiguous `l'` is counted as `le`. Hyphenated clitics like `donne-moi` are split; lexical compounds like `peut-être` stay whole. There is no lemmatization (inflected forms stay distinct).

### Chapter detection notes

- **EPUB**: prefers spine/document sections from the package.
- **txt / pdf / docx**: heuristic headings (`Chapitre`, `Chapter`, `Livre`, short ALL-CAPS lines). Noisy or unchaptered books fall back to a single chapter.

## Deploy (Vercel)

Connect the GitHub repo to Vercel. Free tier is enough; processing runs in the browser, so large books do not hit serverless body limits.
