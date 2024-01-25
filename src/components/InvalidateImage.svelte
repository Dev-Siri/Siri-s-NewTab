<script lang="ts">
  import { RANDOM_IMAGE_URL } from "../constants/urls";
  import backgroundImageStore from "../stores/background-image";
  import { fetchAndCacheImage, removeImageFromCache } from "../utils/cache";

  async function changeImage() {
    removeImageFromCache(RANDOM_IMAGE_URL);
    const image = await fetchAndCacheImage(RANDOM_IMAGE_URL);
    backgroundImageStore.set(URL.createObjectURL(image));
  }
</script>

<button
  type="button"
  on:click={changeImage}
  aria-label="Change Image"
  title="Change Image"
  class="text-4xl hover:opacity-70 duration-200 select-none"
>
  ×
</button>
