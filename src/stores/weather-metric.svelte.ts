import { localKeys } from "../constants/localKeys";

export type Metric = "metric" | "imperial";

class WeatherMetricStore {
  weatherMetric = $state(
    (localStorage.getItem(localKeys.weatherMetric) ?? "metric") as Metric
  );
}

const weatherMetricStore = new WeatherMetricStore();

export default weatherMetricStore;
