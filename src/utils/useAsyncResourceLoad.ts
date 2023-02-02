import { Loader } from "pixi.js";
import Resources from "../models/resources";

export const useAsyncResourceLoad = async (resources: Resources) => {
  return new Promise<void>((resolve, reject) => {
    const loader = Loader.shared;

    loadSpritesheets(resources);
    loadTilesets(resources);
    loadTrainers(resources);

    loader.load();
    loader.onComplete.add(() => resolve());
    loader.onError.add(() => reject());
  });
};

const loadTilesets = (resources: Resources) => {
  const loader = Loader.shared;

  for (const resourceName of resources.tilesets) {
    loader.add(resourceName, `assets/tilesets/${resourceName}.json`);

    if (tilesetForegroundMap.has(resourceName)) {
      const foregroundResource = tilesetForegroundMap.get(resourceName);
      loader.add(
        foregroundResource!,
        `assets/tilesets/${foregroundResource}.json`
      );
    }
  }
};

const loadSpritesheets = (resources: Resources) => {
  const loader = Loader.shared;

  for (const resourceName of resources.spritesheets) {
    loader.add(resourceName, `assets/${resourceName}.json`);
  }
};

const loadTrainers = (resources: Resources) => {
  const loader = Loader.shared;

  for (const trainerName of resources.trainers) {
    loader.add(trainerName, `assets/trainers/${trainerName}.json`);
  }
};

const tilesetForegroundMap = new Map([["tileset_14", "tileset_14_foreground"]]);
