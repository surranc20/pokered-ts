import { Loader } from "pixi.js";
import Resources from "../models/resources";

export const useAsyncResourceLoad = async (resources: Resources) => {
  return new Promise<void>((resolve, reject) => {
    const loader = Loader.shared;
    for (const resourceName of resources.tilesets) {
      loader.add(resourceName, `assets/tilesets/${resourceName}.json`);
    }

    for (const resourceName of resources.spritesheets) {
      loader.add(resourceName, `assets/${resourceName}.json`);
    }

    for (const trainerName of resources.trainers) {
      loader.add(trainerName, `assets/trainers/${trainerName}.json`);
    }

    loader.load();
    loader.onComplete.add(() => resolve());
    loader.onError.add(() => reject());
  });
};
