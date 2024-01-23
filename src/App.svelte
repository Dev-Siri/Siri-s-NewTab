<script lang="ts">
  import Clock from "./components/Clock.svelte";
  import ImageBody from "./components/ImageBody.svelte";
  import SearchBar from "./components/SearchBar.svelte";
  import UrlBar from "./components/UrlBar.svelte";
  import UserInput from "./components/UserInput.svelte";
  import Weather from "./components/Weather.svelte";

  import userStore from "./stores/user";
</script>

<ImageBody>
  {#if $userStore}
    <section class="flex items-center justify-between w-full">
      <UrlBar />
      <Weather />
    </section>
    <section>
      <div class="flex justify-center items-center mt-32">
        <Clock />
      </div>
      <div class="flex justify-center mt-20">
        <SearchBar />
      </div>
    </section>
  {:else}
    <div class="flex h-screen w-screen items-center justify-center">
      <UserInput />
    </div>
  {/if}
</ImageBody>
