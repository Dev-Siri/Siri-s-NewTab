<script lang="ts">
  import { onMount } from "svelte";

  import { localKeys } from "../constants/localKeys";
  import {
    fetchAndCacheImage,
    removeImageFromCache,
    saveToCache,
  } from "../utils/cache";
  import { isOneDayBehind } from "../utils/date";

  let [height, width] = [window.innerHeight, window.innerWidth];
  let src = "";

  onMount(async () => {
    const url = "https://source.unsplash.com/random/1920x1080/?nature";
    const imageDateForDay = localStorage.getItem(localKeys.imageDateForDay);

    if (!imageDateForDay || isOneDayBehind(imageDateForDay)) {
      removeImageFromCache(url);
    }

    const image = await fetchAndCacheImage(url);
    src = URL.createObjectURL(image);
    saveToCache({ [localKeys.imageDateForDay]: new Date().toISOString() });
  });

  window.addEventListener(
    "resize",
    () => ([height, width] = [window.innerHeight, window.innerWidth])
  );
</script>

<main class="h-screen w-screen bg-no-repeat bg-cover text-white">
  <img
    {src}
    alt="Random"
    {height}
    {width}
    class="h-screen w-screen absolute -z-50 brightness-[.65]"
  />
  <slot />
</main>
