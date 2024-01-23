import { imageCache } from "../constants/caches";

export function saveToCache(data: Record<string, string>) {
  for (const key in data) localStorage.setItem(key, data[key]);
}

export async function fetchAndCacheImage(url: string) {
  const cache = await caches.open(imageCache);

  const cachedResponse = await cache.match(url);

  if (!cachedResponse) {
    const response = await fetch(url);
    await cache.put(url, response.clone());
    return response.blob();
  }

  return cachedResponse.blob();
}

export async function removeImageFromCache(url: string) {
  const cache = await caches.open(imageCache);

  cache.delete(url);
}
