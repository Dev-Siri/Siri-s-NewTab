import type { LocationInfo } from "../stores/location.svelte";
import type { LocationData } from "../types";

import { countryCodeToName } from "../utils/location";

export async function getLocationData(city: string): Promise<LocationInfo> {
  const apiKey = import.meta.env.VITE_OWA_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  );
  const data: LocationData[] = await response.json();

  return {
    city: data[0].name,
    country: countryCodeToName(data[0].country),
    latitude: data[0].lat,
    longitude: data[0].lon,
  };
}
