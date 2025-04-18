<script lang="ts">
  import { onDestroy, type Snippet } from "svelte";
  import { fade } from "svelte/transition";

  import type { ImageData } from "../types";

  import { getRandomBackgroundImage } from "../api/background-image";
  import { localKeys } from "../constants/localKeys";
  import backgroundImageStore from "../stores/background-image.svelte";
  import { fetchAndCacheImage, saveToCache } from "../utils/cache";
  import { getNextMidnight } from "../utils/date";
  import { resizeRawImage } from "../utils/image";

  const { children }: { children: Snippet } = $props();

  let [height, width] = $state([window.innerHeight, window.innerWidth]);

  const changeImageDimensions = () =>
    ([height, width] = [window.innerHeight, window.innerWidth]);

  async function updateBackgroundImage() {
    const image = await getRandomBackgroundImage();
    const resizedImageURL = resizeRawImage(image.urls.raw);
    const imageCached = await fetchAndCacheImage(resizedImageURL);

    backgroundImageStore.backgroundImage = image;
    backgroundImageStore.bgImageSet = imageCached;

    saveToCache({
      [localKeys.currentBgImage]: JSON.stringify(image),
      [localKeys.imageDateForDay]: new Date().toISOString(),
      [localKeys.nextUpdate]: getNextMidnight().toISOString(),
    });
  }

  $effect(() => {
    async function updateImage() {
      const imageDateForDay = localStorage.getItem(localKeys.imageDateForDay);
      const nextUpdate = new Date(
        localStorage.getItem(localKeys.nextUpdate) || 0
      );
  
      if (!imageDateForDay || new Date() >= nextUpdate) {
        await updateBackgroundImage();
      } else {
        const cachedImage = localStorage.getItem(localKeys.currentBgImage);
        if (cachedImage) {
          const image = JSON.parse(cachedImage) as ImageData;
          backgroundImageStore.backgroundImage = image;
          const resizedImageURL = resizeRawImage(image.urls.raw);
          backgroundImageStore.bgImageSet = await fetchAndCacheImage(resizedImageURL);
        }
      }
  
      window.addEventListener("resize", changeImageDimensions);
    }

    updateImage();
  });

  onDestroy(() => window.removeEventListener("resize", changeImageDimensions));
</script>

<main class="h-screen w-screen bg-cover text-white">
  {#key backgroundImageStore.backgroundImage}
    <img
      src={backgroundImageStore.bgImageSet ? URL.createObjectURL(backgroundImageStore.bgImageSet) : ""}
      alt="Random"
      {height}
      {width}
      class="h-screen w-screen bg-gray-800 absolute object-cover -z-50 brightness-[.65]"
      transition:fade
    />
  {/key}
  {@render children?.()}
</main>
