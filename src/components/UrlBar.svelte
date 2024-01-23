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
    class="rounded-full p-2 bg-black bg-opacity-50"
    on:click={() => (isShown = !isShown)}
  >
    <div class="h-8 w-8">
      <MdSearch />
    </div>
  </button>
  <form
    class="w-full ml-4 duration-200 {isShown ? 'opacity-100' : 'opacity-0'}"
    on:submit={navigateToSite}
  >
    <input
      type="text"
      placeholder="Search the web with an URL or Google"
      class="bg-transparent text-white placeholder:text-white outline-none h-fit w-full text-2xl"
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
