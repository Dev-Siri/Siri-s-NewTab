import type { SearchEngineChoice } from "../stores/search-engine.svelte";

export function isValidUrl(url: string) {
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
}

export function getSearchEngineQueryUrl(
  searchEngine: SearchEngineChoice,
  q: string
) {
  const encodedQ = encodeURIComponent(q);

  switch (searchEngine) {
    case "google":
      return `https://google.com/search?q=${encodedQ}`;
    case "bing":
      return `https://bing.com/search?q=${encodedQ}`;
    case "duckduckgo":
      return `https://duckduckgo.com?q=${encodedQ}`;
    case "ecosia":
      return `https://ecosia.org/search?q=${encodedQ}`;
    default:
      return `https://yandex.ru/search?text=${encodedQ}`;
  }
}
