import { Search, SunMoon } from "lucide-react";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/92 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1680px] items-center gap-4 px-5">
        <a href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-sm text-primary-ink">Fx</span>
          <span>Fraxses Design</span>
        </a>
        <div className="ml-auto hidden w-full max-w-xl items-center gap-2 rounded-md border border-border bg-elevated px-3 py-2 text-sm text-subtle md:flex">
          <Search size={16} />
          <span>Search components, tokens, patterns...</span>
          <kbd className="ml-auto rounded border border-border bg-surface px-1.5 py-0.5 text-[11px]">/</kbd>
        </div>
        <div className="hidden items-center gap-2 text-sm text-subtle sm:flex">
          <SunMoon size={16} />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
