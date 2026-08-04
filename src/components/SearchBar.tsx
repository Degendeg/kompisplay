import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2" role="search">
      <label htmlFor="video-search" className="sr-only">
        Sök efter videor
      </label>
      <div className="relative flex-1">
        <Search
          size={20}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-cream/40"
        />
        <input
          id="video-search"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Vad vill du titta på idag?"
          className="h-14 w-full rounded-3xl border-2 border-sky/40 bg-white pl-11 pr-4 text-base text-ink placeholder:text-ink/40 focus:border-sky focus:outline-none dark:border-sky-deep/40 dark:bg-night-card dark:text-cream dark:placeholder:text-cream/40"
        />
      </div>
      <button
        type="submit"
        className="h-14 rounded-3xl bg-berry px-5 font-display text-base font-semibold text-white transition hover:bg-berry-deep active:scale-95"
      >
        Sök
      </button>
    </form>
  );
}
