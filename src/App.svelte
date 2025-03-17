<script lang="ts">
  import Clock from "./components/Clock.svelte";
  import ImageBody from "./components/ImageBody.svelte";
  import InvalidateImage from "./components/InvalidateImage.svelte";
  import SearchBar from "./components/SearchBar.svelte";
  import UserInput from "./components/UserInput.svelte";
  import Weather from "./components/Weather.svelte";

  import { getLocationData } from "./api/location";
  import { getWeatherData } from "./api/weather";
  import { localKeys } from "./constants/localKeys";
  import locationStore from "./stores/location";
  import userStore from "./stores/user";
  import weatherMetric from "./stores/weather-metric";
  import { saveToCache } from "./utils/cache";

  $effect(() => {
    const storedCity = localStorage.getItem(localKeys.city);
    const storedLatitude = localStorage.getItem(localKeys.latitude);
    const storedLongitude = localStorage.getItem(localKeys.longitude);
    const storedCountry = localStorage.getItem(localKeys.country);

    if (storedLatitude && storedLongitude && storedCity && storedCountry) {
      locationStore.set({
        city: storedCity,
        country: storedCountry,
        latitude: Number(storedLatitude),
        longitude: Number(storedLongitude),
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const { name: city } = await getWeatherData(
            latitude,
            longitude,
            $weatherMetric
          );

          const { country } = await getLocationData(city);

          saveToCache({
            [localKeys.latitude]: latitude.toString(),
            [localKeys.longitude]: longitude.toString(),
            [localKeys.city]: city,
            [localKeys.country]: country,
          });

          locationStore.set({ latitude, longitude, city, country });
        }
      );
    }
  });
</script>

<ImageBody>
  {#if $userStore}
    <section class="flex items-center justify-end w-full">
      <Weather />
    </section>
    <section class="pb-4">
      <div class="flex justify-center items-center mt-40">
        <Clock />
      </div>
      <div class="flex justify-center mt-16">
        <SearchBar />
      </div>
      <div class="absolute inset-0 top-[96%] pl-4">
        <InvalidateImage />
      </div>
    </section>
  {:else}
    <div class="flex h-screen w-screen items-center justify-center">
      <UserInput />
    </div>
  {/if}
</ImageBody>
