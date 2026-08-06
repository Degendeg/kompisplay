import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream font-body text-ink transition-colors duration-200 dark:bg-night dark:text-cream">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>
      <footer className="px-4 py-6 text-center text-sm text-ink/60 dark:text-cream/50">
        Gjord för nyfikna barn &copy; {new Date().getFullYear()} <a
          className="text-blue-600 underline underline-offset-2 hover:text-blue-800" href="mailto:sebbed89@hotmail.com">
          Sebastian Degerman
        </a>
      </footer>
    </div>
  );
}
