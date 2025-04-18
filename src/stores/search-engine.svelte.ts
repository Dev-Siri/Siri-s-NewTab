import { localKeys } from "../constants/localKeys";

export const searchEngineChoices = [
  "google",
  "duckduckgo",
  "bing",
  "yandex",
  "ecosia",
] as const;

export type SearchEngineChoice = (typeof searchEngineChoices)[number];

const storedSearchEngine =
  localStorage.getItem(localKeys.searchEngine) ?? "google";

function parseSearchEngineChoice(searchEngine: string): SearchEngineChoice {
  if (searchEngineChoices.includes(searchEngine as SearchEngineChoice))
    return searchEngine as SearchEngineChoice;

  return "google";
}

class SearchEngineStore {
  searchEngine = $state<SearchEngineChoice>(
    parseSearchEngineChoice(storedSearchEngine)
  );
}

const searchEngineStore = new SearchEngineStore();

export default searchEngineStore;
