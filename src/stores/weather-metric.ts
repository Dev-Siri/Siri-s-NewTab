import { writable } from "svelte/store";

import { localKeys } from "../constants/localKeys";

export type Metric = "metric" | "imperial";

const weatherMetric = writable(
  (localStorage.getItem(localKeys.weatherMetric) ?? "metric") as Metric
);

export default weatherMetric;
