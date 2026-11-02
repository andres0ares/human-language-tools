import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";

type Props = {
  dict: Dictionary;
  compact?: boolean;
};

export function SiteHeader({ dict, compact = false }: Props) {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
      <Link href="/" className="group">
        <span
          className={`display font-semibold tracking-tight text-ink transition-colors group-hover:text-teal-deep ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          {dict.brand.name}
        </span>
      </Link>
      <nav className="flex items-center gap-5 text-sm text-ink-soft">
        <Link href="/" className="interactive-underline">
          {dict.nav.home}
        </Link>
        <Link href="/#tools" className="interactive-underline">
          {dict.nav.tools}
        </Link>
      </nav>
    </header>
  );
}
