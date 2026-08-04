interface StatusMessageProps {
  emoji: string;
  title: string;
  description?: string;
}

export default function StatusMessage({ emoji, title, description }: StatusMessageProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-3xl bg-white/60 px-6 py-16 text-center dark:bg-night-card/60">
      <span className="text-4xl" aria-hidden="true">
        {emoji}
      </span>
      <p className="font-display text-lg font-semibold text-ink dark:text-cream">{title}</p>
      {description ? (
        <p className="max-w-sm text-sm text-ink/60 dark:text-cream/60">{description}</p>
      ) : null}
    </div>
  );
}
