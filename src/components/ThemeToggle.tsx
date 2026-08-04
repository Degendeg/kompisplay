import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Byt till ljust läge" : "Byt till mörkt läge"}
      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-ink shadow-sm transition hover:scale-105 active:scale-95 dark:bg-night-card dark:text-cream"
    >
      {isDark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
