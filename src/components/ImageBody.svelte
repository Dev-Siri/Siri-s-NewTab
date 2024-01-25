<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";

  import { localKeys } from "../constants/localKeys";
  import { RANDOM_IMAGE_URL } from "../constants/urls";
  import backgroundImageStore from "../stores/background-image";
  import {
    fetchAndCacheImage,
    removeImageFromCache,
    saveToCache,
  } from "../utils/cache";
  import { isOneDayBehind } from "../utils/date";

  let [height, width] = [window.innerHeight, window.innerWidth];

  const changeImageDimensions = () =>
    ([height, width] = [window.innerHeight, window.innerWidth]);

  onMount(async () => {
    const imageDateForDay = localStorage.getItem(localKeys.imageDateForDay);

    const image = await fetchAndCacheImage(RANDOM_IMAGE_URL);
    backgroundImageStore.set(URL.createObjectURL(image));

    if (!imageDateForDay || isOneDayBehind(imageDateForDay)) {
      removeImageFromCache(RANDOM_IMAGE_URL);
      const image = await fetchAndCacheImage(RANDOM_IMAGE_URL);
      backgroundImageStore.set(URL.createObjectURL(image));
    }

    saveToCache({ [localKeys.imageDateForDay]: new Date().toISOString() });

    window.addEventListener("resize", changeImageDimensions);
  });

  onDestroy(() => window.removeEventListener("resize", changeImageDimensions));
</script>

<main class="h-screen w-screen bg-cover text-white">
  {#key $backgroundImageStore}
    <img
      src={$backgroundImageStore}
      alt="Random"
      {height}
      {width}
      class="h-screen w-screen bg-gray-800 absolute -z-50 brightness-[.65]"
      transition:fade
    />
  {/key}
  <slot />
</main>
