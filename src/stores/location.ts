import { writable } from "svelte/store";
import { localKeys } from "../constants/localKeys";

export interface LocationInfo {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

const storedLatitude = localStorage.getItem(localKeys.latitude);
const storedLongitude = localStorage.getItem(localKeys.longitude);

const locationStore = writable<LocationInfo>({
  city: "",
  country: "",
  latitude: Number(storedLatitude),
  longitude: Number(storedLongitude),
});

export default locationStore;
