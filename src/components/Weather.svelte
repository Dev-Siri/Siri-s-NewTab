<script lang="ts">
  import { onMount } from "svelte";
  import { localKeys } from "../constants/localKeys";
  import ExtraWeatherInfo from "./ExtraWeatherInfo.svelte";

  import type { WeatherData } from "../types";

  import { getWeatherData } from "../api/weather";
  import locationStore from "../stores/location";
  import weatherMetric from "../stores/weather-metric";
  import { fetchAndCacheImage, saveToCache } from "../utils/cache";

  let name = $state(localStorage.getItem(localKeys.name) ?? "");
  let icon = $state(localStorage.getItem(localKeys.icon) ?? "");

  const storedTemperature = localStorage.getItem(localKeys.temperature) ?? 0;
  const storedFeelsLikeTemperature =
    localStorage.getItem(localKeys.feelsLikeTemperature) ?? 0;
  const storedWindDirection =
    localStorage.getItem(localKeys.windDirection) ?? 0;
  const storedHumidity = localStorage.getItem(localKeys.humidity) ?? "";
  const storedWindSpeed = localStorage.getItem(localKeys.windSpeed) ?? 0;

  let temperature = $state(Number(storedTemperature));
  let feelsLikeTemperature = $state(Number(storedFeelsLikeTemperature));
  let windDirection = $state(Number(storedWindDirection));
  let windSpeed = $state(Number(storedWindSpeed));
  let humidity = $state(Number(storedHumidity));
  let isExtraMenuOpen = $state(false);
  let iconSrc = $state("");

  onMount(() => {
    function refetchOnWindowRefocus() {
      if (document.visibilityState === "visible") fetchWeather();
    }

    const closeExtraMenu = () => (isExtraMenuOpen = false);

    document.addEventListener("visibilitychange", refetchOnWindowRefocus);
    document.addEventListener("click", closeExtraMenu);

    return () => {
      document.removeEventListener("visibilitychange", refetchOnWindowRefocus);
      document.removeEventListener("click", closeExtraMenu);
    };
  });

  function handleOpenMenu() {
    isExtraMenuOpen = !isExtraMenuOpen;

    if (isExtraMenuOpen) fetchWeather();
  }

  $effect(() => {
    $weatherMetric;
    $locationStore;
    fetchWeather();
  })

  async function fetchWeather() {
    const { latitude, longitude } = $locationStore;

    const data: WeatherData = await getWeatherData(
      latitude,
      longitude,
      $weatherMetric
    );

    temperature = Math.round(data.main.temp);
    icon = data.weather[0].icon;
    name = data.weather[0].main;
    feelsLikeTemperature = data.main.feels_like;
    windDirection = data.wind.deg;
    windSpeed = data.wind.speed;
    humidity = data.main.humidity;

    saveToCache({
      [localKeys.temperature]: temperature.toString(),
      [localKeys.icon]: icon,
      [localKeys.name]: name,
      [localKeys.feelsLikeTemperature]: feelsLikeTemperature.toString(),
      [localKeys.windDirection]: windDirection.toString(),
      [localKeys.windSpeed]: windSpeed.toString(),
      [localKeys.humidity]: humidity.toString(),
    });
  }

  $effect(() => {
    async function getInitialData() {
      const weatherImage = await fetchAndCacheImage(
        `https://openweathermap.org/img/wn/${icon}@2x.png`
      );
      iconSrc = URL.createObjectURL(weatherImage);
    }

    getInitialData();
  });
</script>

<!-- Main holder of the weather info -->
<div
  class="m-4 duration-200"
  role="menu"
  tabindex={0}
  onkeydown={(e) => e.stopPropagation()}
  onclick={(e) => e.stopPropagation()}
>
  <button
    type="button"
    class="cursor-pointer flex flex-col items-end p-4 group"
    onclick={handleOpenMenu}
  >
    <div class="flex gap-2">
      <img
        src={iconSrc}
        alt="Weather Icon"
        height={32}
        width={32}
        class="bg-white mix-blend-difference bg-opacity-70 rounded-full h-8 w-8"
      />
      <p class="text-2xl duration-200 group-hover:opacity-90">{temperature}°</p>
    </div>
    <p class="text-md mt-0.5 mr-0.5 leading-tight duration-200 group-hover:opacity-90">
      {$locationStore.city}
    </p>
  </button>
  <div
    class="absolute duration-200 right-8 {isExtraMenuOpen
      ? 'block slide-down'
      : 'hidden slide-up'}"
  >
    <ExtraWeatherInfo
      {name}
      {temperature}
      {humidity}
      {icon}
      {feelsLikeTemperature}
      {windSpeed}
      {windDirection}
    />
  </div>
</div>

<style>
  @keyframes slide-down {
    0% {
      opacity: 0;
      translate: 0 -5px;
    }
    100% {
      opacity: 1;
      translate: 0 0px;
    }
  }

  @keyframes slide-up {
    0% {
      opacity: 1;
      translate: 0 -5px;
    }
    100% {
      opacity: 0;
      translate: 0 0px;
    }
  }

  .slide-down {
    animation: slide-down 0.1s ease-in;
  }

  .slide-up {
    animation: slide-up 0.1s ease-out;
  }
</style>
