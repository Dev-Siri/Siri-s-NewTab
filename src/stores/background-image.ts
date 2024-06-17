import { writable } from "svelte/store";

import type { ImageData } from "../types";

const backgroundImageStore = writable<ImageData | null>(null);

export const bgImageSet = writable<Blob | null>(null);

export default backgroundImageStore;
