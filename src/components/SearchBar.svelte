<script lang="ts">
  // @ts-expect-error
  import MdSearch from "svelte-icons/md/MdSearch.svelte";
  // @ts-expect-error
  import IoLogoGoogle from "svelte-icons/io/IoLogoGoogle.svelte";
  // @ts-expect-error
  import FaYandex from "svelte-icons/fa/FaYandex.svelte";
  // @ts-expect-error
  import DiBingSmall from "svelte-icons/di/DiBingSmall.svelte";
  // @ts-expect-error
  import FaTree from "svelte-icons/fa/FaTree.svelte";

  import { localKeys } from "../constants/localKeys";
  import searchEngineStore, {
    searchEngineChoices,
  } from "../stores/search-engine";
  import { saveToCache } from "../utils/cache";
  import { getSearchEngineQueryUrl } from "../utils/url";

  let searchTerm = "";

  function search(
    e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    e.preventDefault();

    location.assign(getSearchEngineQueryUrl($searchEngineStore, searchTerm));
  }

  function changeSearchEngine() {
    searchTerm = "";
    const indexOfCurrent = searchEngineChoices.indexOf($searchEngineStore);
    const nextChoice =
      searchEngineChoices[
        indexOfCurrent + 1 === searchEngineChoices.length
          ? 0
          : indexOfCurrent + 1
      ];

    searchEngineStore.set(nextChoice);

    saveToCache({ [localKeys.searchEngine]: nextChoice });
  }
</script>

<form
  class="flex items-center cursor-pointer justify-center w-[45%] bg-opacity-55 bg-blur-2xl bg-gray-900 rounded-full"
  on:submit={search}
>
  <div class="mt-1 h-10 w-10 mx-4">
    <MdSearch />
  </div>
  <input
    type="text"
    placeholder="Search"
    class="p-3 pl-0 bg-transparent cursor-pointer outline-none w-full text-3xl"
    bind:value={searchTerm}
  />
  <button type="button" on:click={changeSearchEngine}>
    <div class="{$searchEngineStore === 'yandex' ? 'h-5' : 'h-6'} w-6 mr-6">
      {#if $searchEngineStore === "google"}
        <IoLogoGoogle />
      {:else if $searchEngineStore === "duckduckgo"}
        <div class="bg-white rounded-full">
          <img
            src="/images/ddg.webp"
            alt="DuckDuckGo Logo"
            height={24}
            width={24}
          />
        </div>
      {:else if $searchEngineStore === "bing"}
        <DiBingSmall />
      {:else if $searchEngineStore === "yandex"}
        <FaYandex />
      {:else if $searchEngineStore === "ecosia"}
        <FaTree />
      {/if}
    </div>
  </button>
</form>
