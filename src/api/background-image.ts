import type { ImageData } from "../types";

export async function getRandomBackgroundImage(): Promise<ImageData> {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const response = await fetch(
    "https://api.unsplash.com/photos/random?query=nature",
    {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    }
  );

  return response.json();
}
