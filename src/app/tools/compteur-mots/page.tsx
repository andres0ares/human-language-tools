import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { WordCounterApp } from "@/components/word-counter/WordCounterApp";
import { getDictionary } from "@/i18n/get-dictionary";
import { defaultLocale } from "@/i18n/config";

export default async function WordCounterPage() {
  const dict = await getDictionary(defaultLocale);

  return (
    <div className="grain hero-wash flex flex-1 flex-col">
      <SiteHeader dict={dict} compact />

      <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-6 pb-20 pt-6">
        <Link
          href="/"
          className="text-sm font-medium text-teal interactive-underline"
        >
          ← {dict.wordCounter.backToHub}
        </Link>

        <header className="mt-6 max-w-2xl">
          <h1 className="display animate-rise text-3xl text-ink sm:text-5xl">
            {dict.wordCounter.title}
          </h1>
          <p className="animate-rise-delay mt-3 text-lg text-ink-soft">
            {dict.wordCounter.subtitle}
          </p>
        </header>

        <div className="animate-fade mt-10">
          <WordCounterApp dict={dict} />
        </div>
      </main>
    </div>
  );
}
