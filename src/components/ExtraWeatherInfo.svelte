<script lang="ts">
  import { getLocationData } from "../api/location";
  import { localKeys } from "../constants/localKeys";
  import locationStore from "../stores/location.svelte";
  import weatherMetricStore from "../stores/weather-metric.svelte";
  import { fetchAndCacheImage, saveToCache } from "../utils/cache";
  import { metrePerSecToKmPerHr } from "../utils/conversions";

  const {
    temperature,
    feelsLikeTemperature,
    windSpeed,
    humidity,
    windDirection,
    icon,
    name
  }: {
    temperature: number;
    feelsLikeTemperature: number;
    windSpeed: number;
    humidity: number;
    windDirection: number;
    icon: string;
    name: string;
  } = $props();

  let iconSrc = $state("");
  let isEditCityMode = $state(false);

  let newCity = $state(locationStore.city);

  function switchMetrics() {
    const updatedMetric = weatherMetricStore.weatherMetric === "imperial" ? "metric" : "imperial";

    weatherMetricStore.weatherMetric = updatedMetric;
    localStorage.setItem(localKeys.weatherMetric, updatedMetric);
  }

  $effect(() => {
    async function getCachedImage() {
      const weatherImage = await fetchAndCacheImage(
        `https://openweathermap.org/img/wn/${icon}@2x.png`
      );
      iconSrc = URL.createObjectURL(weatherImage);
    }

    getCachedImage();
  });

  async function handleCityChange(
    e: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    if (e.key !== "Enter") return;

    const location = await getLocationData(newCity);

    locationStore.longitude = location.longitude;
    locationStore.latitude = location.latitude;
    locationStore.country = location.country;
    locationStore.city = location.city;

    saveToCache({
      [localKeys.latitude]: location.latitude.toString(),
      [localKeys.longitude]: location.longitude.toString(),
      [localKeys.city]: location.city,
    });

    isEditCityMode = false;
  }

  function handleCityEditButtonClick() {
    isEditCityMode = !isEditCityMode;
  }
</script>

<div class="bg-black p-4 w-96 bg-opacity-80 rounded-md cursor-default">
  <div class="flex items-center justify-between">
    <div>
      {#if isEditCityMode}
        <!-- svelte-ignore a11y_autofocus -->
        <input
          type="text"
          name="edit-city"
          id="edit-city"
          autofocus
          bind:value={newCity}
          onkeydown={handleCityChange}
          class="bg-transparent outline-none text-lg"
        />
        <div class="h-0.5 w-[10%] bg-white scale-in"></div>
      {:else}
        <button
          type="button"
          onclick={handleCityEditButtonClick}
          class="duration-200 hover:underline cursor-pointer"
        >
          <p class="text-lg leading-tight">
            {locationStore.city}
          </p>
        </button>
        <p class="text-lg leading-tight inline -ml-0.5">
          , {locationStore.country}
        </p>
      {/if}
      <p class="text-sm text-gray-400">{name}</p>
    </div>
    <button
      type="button"
      title={weatherMetricStore.weatherMetric === "metric"
        ? "Switch to Fahrenheit (°F)"
        : "Switch to Celsius (°C)"}
      onclick={switchMetrics}
      class="text-gray-300 duration-200 hover:text-gray-400"
    >
      °{weatherMetricStore.weatherMetric === "metric" ? "C" : "F"}
    </button>
  </div>
  <div class="flex items-center py-2">
    <img
      src={iconSrc}
      alt="Weather Icon"
      height={80}
      width={80}
      draggable="false"
      class="bg-white mix-blend-difference bg-opacity-40 rounded-full h-20 w-20"
    />
    <p class="text-5xl ml-4">
      {temperature}°
    </p>
    <div class="ml-10">
      <p class="text-gray-400 text-sm">
        Feels like
        <span class="text-white ml-0.5">
          {Math.round(feelsLikeTemperature)}°
        </span>
      </p>
      <p class="text-gray-400 text-sm">
        Humidity
        <span class="text-white ml-0.5">
          {Math.round(humidity)}%
        </span>
      </p>
      <p class="text-gray-400 text-sm">
        Wind
        <span
          style="rotate: {windDirection}deg;"
          class="inline-block text-white ml-0.5"
        >
          ↑
        </span>
        <span class="text-white">
          {metrePerSecToKmPerHr(windSpeed).toFixed(2)}{weatherMetricStore.weatherMetric ===
          "metric"
            ? "km/hr"
            : "mph"}
        </span>
      </p>
    </div>
  </div>
</div>

<style>
  @keyframes scale-in {
    0% {
      width: 0%;
    }
    100% {
      width: 10%;
    }
  }

  .scale-in {
    animation: scale-in 200ms ease-in;
  }
</style>
