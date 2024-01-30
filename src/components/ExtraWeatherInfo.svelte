<script lang="ts">
  import { onMount } from "svelte";

  import { localKeys } from "../constants/localKeys";
  import weatherMetric from "../stores/weather-metric";
  import { fetchAndCacheImage } from "../utils/cache";
  import { metrePerSecToKmPerHr } from "../utils/conversions";

  export let temperature: number;
  export let feelsLikeTemperature: number;
  export let windSpeed: number;
  export let humidity: number;
  export let windDirection: number;
  export let city: string;
  export let icon: string;
  export let name: string;

  let iconSrc = "";

  function switchMetrics() {
    const updatedMetric = $weatherMetric === "imperial" ? "metric" : "imperial";

    weatherMetric.set(updatedMetric);
    localStorage.setItem(localKeys.weatherMetric, updatedMetric);
  }

  onMount(async () => {
    const weatherImage = await fetchAndCacheImage(
      `https://openweathermap.org/img/wn/${icon}@2x.png`
    );
    iconSrc = URL.createObjectURL(weatherImage);
  });
</script>

<div class="bg-black p-4 w-96 bg-opacity-80 rounded-md cursor-default">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-lg leading-tight">{city}</p>
      <p class="text-sm text-gray-400">{name}</p>
    </div>
    <button
      type="button"
      title={$weatherMetric === "metric"
        ? "Switch to Fahrenheit (°F)"
        : "Switch to Celsius (°C)"}
      on:click={switchMetrics}
      class="text-gray-300 duration-200 hover:text-gray-400"
    >
      °{$weatherMetric === "metric" ? "C" : "F"}
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
          {metrePerSecToKmPerHr(windSpeed).toFixed(2)}{$weatherMetric ===
          "metric"
            ? "km/hr"
            : "mph"}
        </span>
      </p>
    </div>
  </div>
</div>
