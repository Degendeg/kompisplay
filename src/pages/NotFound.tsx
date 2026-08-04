import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <span className="text-5xl" aria-hidden="true">
        🧭
      </span>
      <h1 className="font-display text-2xl font-bold text-forest dark:text-sun">
        Oj, den sidan hittade vi inte
      </h1>
      <p className="text-ink/70 dark:text-cream/70">Vi vet inte vart den här vägen leder.</p>
      <Link
        to="/"
        className="mt-2 rounded-full bg-berry px-5 py-2.5 font-display font-semibold text-white transition hover:bg-berry-deep"
      >
        Till startsidan
      </Link>
    </div>
  );
}
