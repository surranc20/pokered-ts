import { Loader } from "pixi.js";
import Resources from "../models/resources";

export const useAsyncResourceLoad = async (resources: Resources) => {
  return new Promise<void>((resolve, reject) => {
    const loader = Loader.shared;
    for (const resourceName of resources.tilesets) {
      loader.add(resourceName, `assets/tilesets/${resourceName}.json`);
    }

    if (resources.spritesheets) {
      for (const resourceName of resources.spritesheets) {
        loader.add(resourceName, `assets/${resourceName}.json`);
      }
    }
    loader.load();
    loader.onComplete.add(() => resolve());
    loader.onError.add(() => reject());
  });
};
