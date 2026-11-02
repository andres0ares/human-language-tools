import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { getDictionary } from "@/i18n/get-dictionary";
import { defaultLocale } from "@/i18n/config";

export default async function Home() {
  const dict = await getDictionary(defaultLocale);

  return (
    <div className="grain hero-wash flex flex-1 flex-col">
      <SiteHeader dict={dict} />

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 pb-20 pt-10 sm:pt-16">
        <section className="max-w-2xl">
          <p className="animate-fade text-sm font-medium uppercase tracking-[0.18em] text-teal">
            {dict.brand.name}
          </p>
          <h1 className="display animate-rise mt-4 text-4xl leading-tight text-ink sm:text-6xl">
            {dict.hub.headline}
          </h1>
          <p className="animate-rise-delay mt-5 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {dict.hub.supporting}
          </p>
          <div className="animate-fade mt-8 flex flex-wrap gap-3">
            <Link
              href="/tools/compteur-mots"
              className="rounded-md bg-teal px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-deep"
            >
              {dict.hub.cta}
            </Link>
          </div>
        </section>

        <section id="tools" className="mt-24 scroll-mt-24">
          <h2 className="display text-3xl text-ink">{dict.hub.toolsHeading}</h2>
          <p className="mt-2 max-w-xl text-ink-soft">{dict.hub.toolsSupporting}</p>

          <div className="mt-8 border-t border-foam pt-8">
            <Link
              href="/tools/compteur-mots"
              className="group block max-w-xl transition"
            >
              <h3 className="display text-2xl text-ink transition group-hover:text-teal-deep">
                {dict.hub.wordCounterName}
              </h3>
              <p className="mt-2 text-ink-soft">{dict.hub.wordCounterBlurb}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-teal interactive-underline">
                {dict.hub.cta} →
              </span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-foam/80 px-6 py-6 text-center text-sm text-ink-soft">
        {dict.brand.tagline}
      </footer>
    </div>
  );
}
