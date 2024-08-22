<script lang="ts">
  // @ts-expect-error
  import MdSearch from "svelte-icons/md/MdSearch.svelte";

  import searchEngineStore from "../stores/search-engine";
  import { getSearchEngineQueryUrl, isValidUrl } from "../utils/url";

  let isFocused = false;
  let isShown = false;
  let urlOrST = "";

  function navigateToSite(
    e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
  ) {
    e.preventDefault();

    location.assign(
      isValidUrl(urlOrST)
        ? urlOrST
        : getSearchEngineQueryUrl($searchEngineStore, urlOrST)
    );
  }
</script>

<div class="flex ml-4 w-2/4">
  <button
    type="button"
    aria-label="Toggle URL Bar"
    class="rounded-full p-2 bg-black bg-opacity-50"
    on:click={() => (isShown = !isShown)}
  >
    <div class="h-8 w-8">
      <MdSearch />
    </div>
  </button>
  <form
    class="w-full ml-4 duration-200 {isShown
      ? 'block slide-from-left'
      : 'hidden'}"
    on:submit={navigateToSite}
  >
    <input
      type="text"
      placeholder="Search the web with an URL or {$searchEngineStore
        .charAt(0)
        .toUpperCase()}{$searchEngineStore.slice(1)}"
      class="bg-transparent text-white placeholder:text-white outline-none h-fit w-full text-xl"
      id="url-bar"
      bind:value={urlOrST}
      on:focus={() => (isFocused = true)}
      on:blur={() => (isFocused = false)}
    />
    <div
      class="h-1 mt-1 w-full bg-white rounded-full duration-200 {isFocused
        ? 'scale-100'
        : 'scale-50 -ml-[150px]'}"
    />
  </form>
</div>

<style>
  @keyframes slide-from-left {
    0% {
      opacity: 0;
      translate: -60px;
      z-index: -10;
    }
    100% {
      opacity: 1;
      translate: 0px;
      z-index: 0;
    }
  }

  .slide-from-left {
    animation: slide-from-left 300ms ease-in;
  }
</style>
