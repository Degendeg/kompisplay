import "@testing-library/jest-dom/vitest";

// jsdom saknar window.matchMedia — useTheme behöver den för att avgöra
// systemets ljus/mörkt-preferens.
if (typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
