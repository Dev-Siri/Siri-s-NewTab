import { localKeys } from "../constants/localKeys";

export interface LocationInfo {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

const storedLatitude = localStorage.getItem(localKeys.latitude);
const storedLongitude = localStorage.getItem(localKeys.longitude);

class LocationStore {
  city = $state("");
  country = $state("");
  latitude = $state(Number(storedLatitude));
  longitude = $state(Number(storedLongitude));
}

const locationStore = new LocationStore();

export default locationStore;
