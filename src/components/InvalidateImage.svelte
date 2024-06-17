<script lang="ts">
  // @ts-expect-error
  import FaArrowRight from "svelte-icons/fa/FaArrowRight.svelte";

  import { getRandomBackgroundImage } from "../api/background-image";
  import { localKeys } from "../constants/localKeys";
  import backgroundImageStore, { bgImageSet } from "../stores/background-image";
  import { fetchAndCacheImage, saveToCache } from "../utils/cache";
  import { getNextMidnight } from "../utils/date";
  import { resizeRawImage } from "../utils/image";

  async function changeImage() {
    const image = await getRandomBackgroundImage();
    const resizedImageURL = resizeRawImage(image.urls.raw);
    const imageCached = await fetchAndCacheImage(resizedImageURL);

    bgImageSet.set(imageCached);

    backgroundImageStore.set(image);

    saveToCache({
      [localKeys.currentBgImage]: JSON.stringify(image),
      [localKeys.imageDateForDay]: new Date().toISOString(),
      [localKeys.nextUpdate]: getNextMidnight().toISOString(),
    });
  }
</script>

<div class="flex gap-2">
  <p>
    Photo by
    <a
      href={`https://unsplash.com/@${$backgroundImageStore?.user.username}`}
      target="_blank"
      rel="noopener noreferrer"
      class="hover:opacity-70 duration-200 underline"
    >
      {$backgroundImageStore?.user.name}
    </a>
    on
    <a
      href={`https://unsplash.com`}
      target="_blank"
      rel="noopener noreferrer"
      class="hover:opacity-70 duration-200 underline"
    >
      UnSplash
    </a>
  </p>
  <button
    type="button"
    on:click={changeImage}
    aria-label="Change Image"
    title="Change Image"
    class="text-4xl hover:opacity-70 duration-200 select-none"
  >
    <div class="h-5 w-5">
      <FaArrowRight />
    </div>
  </button>
</div>
