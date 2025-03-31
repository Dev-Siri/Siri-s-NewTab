<script lang="ts">
  import { TreePine } from "lucide-svelte";

  import { localKeys } from "../constants/localKeys";
  import searchEngineStore, {
    searchEngineChoices,
  } from "../stores/search-engine.svelte";
  import { saveToCache } from "../utils/cache";
  import { getSearchEngineQueryUrl } from "../utils/url";

  import BingLogo from "./vectors/BingLogo.svelte";
  import GoogleLogo from "./vectors/GoogleLogo.svelte";
  import YandexLogo from "./vectors/YandexLogo.svelte";

  let searchTerm = $state("");

  function search(
    e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    e.preventDefault();

    location.assign(getSearchEngineQueryUrl(searchEngineStore.searchEngine, searchTerm));
  }

  function changeSearchEngine() {
    searchTerm = "";
    const indexOfCurrent = searchEngineChoices.indexOf(searchEngineStore.searchEngine);
    const nextChoice =
      searchEngineChoices[
        indexOfCurrent + 1 === searchEngineChoices.length
          ? 0
          : indexOfCurrent + 1
      ];

    searchEngineStore.searchEngine = nextChoice;

    saveToCache({ [localKeys.searchEngine]: nextChoice });
  }
</script>

<form
  class="flex items-center cursor-pointer justify-center w-[45%] bg-opacity-55 bg-blur-2xl bg-gray-900 rounded-full"
  onsubmit={search}
>
  <div class="flex items-center ml-6">
    <button
      type="button"
      onclick={changeSearchEngine}
      aria-label="Selected search engine"
      class="cursor-pointer w-6 mr-6 {searchEngineStore.searchEngine === 'yandex' ? 'h-5' : 'h-6'}"
    >
      {#if searchEngineStore.searchEngine === "google"}
        <GoogleLogo />
      {:else if searchEngineStore.searchEngine === "duckduckgo"}
        <div class="bg-white rounded-full">
          <img
            src="/images/ddg.webp"
            alt="DuckDuckGo Logo"
            height={24}
            width={24}
          />
        </div>
      {:else if searchEngineStore.searchEngine === "bing"}
        <BingLogo />
      {:else if searchEngineStore.searchEngine === "yandex"}
        <YandexLogo />
      {:else if searchEngineStore.searchEngine === "ecosia"}
        <TreePine fill="white" />
      {/if}
    </button>
  </div>
  <input
    type="text"
    placeholder="Search"
    class="p-3 pl-0 bg-transparent cursor-pointer outline-none w-full text-3xl"
    id="search-bar"
    bind:value={searchTerm}
  />
</form>
