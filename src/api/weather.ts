import type { Metric } from "../stores/weather-metric";
import type { WeatherData } from "../types";

export async function getWeatherData(
  latitude: number,
  longitude: number,
  metric: Metric
): Promise<WeatherData> {
  const apiKey = import.meta.env.VITE_OWA_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=${metric}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );

  return response.json();
}
