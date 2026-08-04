import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b-4 border-sun/60 bg-cream/90 backdrop-blur dark:border-sun/30 dark:bg-night/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky text-2xl">
            🐣
          </span>
          <span className="font-display text-xl font-semibold text-forest dark:text-sun sm:text-2xl">
            Kompisplay
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1 rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest dark:bg-forest/20 dark:text-sun sm:flex">
            <ShieldCheck size={16} />
            SafeSearch: Strikt
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
