<script lang="ts">
  import { Disc } from "lucide-svelte";

  import { getRandomBackgroundImage } from "../api/background-image";
  import { localKeys } from "../constants/localKeys";
  import backgroundImageStore from "../stores/background-image.svelte";
  import { fetchAndCacheImage, saveToCache } from "../utils/cache";
  import { getNextMidnight } from "../utils/date";
  import { resizeRawImage } from "../utils/image";

  async function changeImage() {
    const image = await getRandomBackgroundImage();
    const resizedImageURL = resizeRawImage(image.urls.raw);
    const imageCached = await fetchAndCacheImage(resizedImageURL);

    backgroundImageStore.bgImageSet = imageCached;
    backgroundImageStore.backgroundImage = image;

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
      href={`https://unsplash.com/@${backgroundImageStore.backgroundImage?.user.username}`}
      target="_blank"
      rel="noopener noreferrer"
      class="hover:opacity-70 duration-200 underline"
    >
      {backgroundImageStore.backgroundImage?.user.name}
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
    onclick={changeImage}
    aria-label="Change Image"
    title="Change Image"
    class="text-4xl cursor-pointer hover:opacity-70 duration-200 select-none"
  >
    <Disc size={20} />
  </button>
</div>
