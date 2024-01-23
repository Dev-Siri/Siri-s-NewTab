<script lang="ts">
  export let temperature: number;
  export let feelsLikeTemperature: number;
  export let windSpeed: number;
  export let humidity: number;
  export let windDirection: number;
  export let city: string;
  export let icon: string;
  export let name: string;
</script>

<div class="bg-black p-4 w-96 bg-opacity-80 rounded-md cursor-default">
  <div>
    <p class="text-lg leading-tight">{city}</p>
    <p class="text-sm text-gray-400">{name}</p>
  </div>
  <div class="flex items-center py-2">
    <img
      src="https://openweathermap.org/img/wn/{icon}@2x.png"
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
          class="inline-block text-white ml-0.5">↑</span
        >
        <span class="text-white">
          {(windSpeed * (5 / 18)).toFixed(2)}km/hr
        </span>
      </p>
    </div>
  </div>
</div>
