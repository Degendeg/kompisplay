import type { Category } from "../types";

export const CATEGORIES: Category[] = [
  { id: "bebisar", label: "Bebisar", emoji: "👶", query: "ta hand om bebis svenska" },
  { id: "sagor", label: "Sagor", emoji: "📖", query: "sagor för barn på svenska" },
  { id: "sanger", label: "Sånger", emoji: "🎵", query: "barnsånger på svenska" },
  { id: "djur", label: "Djur", emoji: "🐾", query: "djur för barn fakta svenska" },
  { id: "pyssel", label: "Pyssel", emoji: "✂️", query: "pyssel för barn svenska" },
  { id: "vetenskap", label: "Vetenskap", emoji: "🔬", query: "vetenskap för barn svenska" },
  { id: "dans", label: "Dans & rörelse", emoji: "💃", query: "barndans rörelse svenska" },
];

export const DEFAULT_CATEGORY = CATEGORIES[0];