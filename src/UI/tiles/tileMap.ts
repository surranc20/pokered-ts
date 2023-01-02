import { Container, Loader } from "pixi.js";
import Tile from "./tile";

export default class TileMap {
  foregroundContainer = new Container();
  backgroundContainer = new Container();
  constructor(public levelName: string) {}

  async createTileMap() {
    const levelData = await import(`../../maps/${this.levelName}.json`);

    // Ensure tilesets are all loaded
    for (const tileset of levelData.tilesets) {
      if (!Loader.shared.resources[tileset]) {
        throw Error(
          `Cannot create level ${this.levelName} if ${tileset} is not loaded`
        );
      }
    }

    const tileMapArray = levelData.mapArray;

    for (let y = 0; y < tileMapArray.length; y++) {
      for (let x = 0; x < tileMapArray[0].length; x++) {
        const tileInfo = tileMapArray[y][x];
        this.backgroundContainer.addChild(new Tile(tileInfo, x, y));
      }
    }
  }
}
