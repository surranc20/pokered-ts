import { Container, Loader } from "pixi.js";
import Tile from "./tile";
import { Cardinality } from "../../enums/cardinality";
import { pointWithinBounds } from "../../utils/miscUtils";

export default class TileMap {
  foregroundContainer = new Container();
  backgroundContainer = new Container();
  tileLookupMap = new Map();
  mapDimensions!: number[];
  constructor(public levelName: string) {}

  async createTileMap() {
    const levelData = await import(`../../maps/${this.levelName}.json`);

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
        const tile = new Tile(tileInfo, x, y);
        this.backgroundContainer.addChild(tile);
        this.tileLookupMap.set(this.createLookupKeyFromColRow(x, y), tile);
      }
    }

    this.mapDimensions = [tileMapArray[0].length, tileMapArray.length];
  }

  getTileFromColRow(col: number, row: number) {
    return this.tileLookupMap.get(this.createLookupKeyFromColRow(col, row));
  }

  getAdjacentTiles(tile: Tile) {
    const adjMap = new Map();
    const [maxXTile, maxYTile] = this.getMapSize();

    for (const [cardinality, offset] of Cardinality.getCardinalityOffsetMap()) {
      const tileXPos = offset[0] + tile.tilemapCol;
      const tileYPos = offset[1] + tile.tilemapRow;

      if (pointWithinBounds(tileXPos, tileYPos, maxXTile, maxYTile)) {
        adjMap.set(
          cardinality,
          this.tileLookupMap.get(
            this.createLookupKeyFromColRow(tileXPos, tileYPos)
          )
        );
      }
    }

    return adjMap;
  }

  getMapSize() {
    if (this.mapDimensions) {
      return this.mapDimensions;
    }
    throw Error("Map not loaded. Can't get map size");
  }

  private createLookupKeyFromColRow(col: number, row: number) {
    return `${col}, ${row}`;
  }
}
