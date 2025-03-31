import type { ImageData } from "../types";

class BackgroundImageStore {
  backgroundImage = $state<ImageData | null>(null);
  bgImageSet = $state<Blob | null>(null);
}

const backgroundImageStore = new BackgroundImageStore();

export default backgroundImageStore;
