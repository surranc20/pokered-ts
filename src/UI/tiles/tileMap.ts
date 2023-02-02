import { Container, Loader } from "pixi.js";
import Tile from "./tile";
import { Cardinality } from "../../enums/cardinality";
import { pointWithinBounds } from "../../utils/miscUtils";
import PersonFactory from "../../people/personFactory";

export default class TileMap {
  foregroundContainer = new Container();
  backgroundContainer = new Container();
  tileLookupMap = new Map();
  mapDimensions = [0, 0];
  trainers = new Map();
  constructor(public levelName: string) {}

  async createTileMap() {
    const levelData = await import(`../../maps/${this.levelName}.json`);
    this.checkIfTexturesLoaded(levelData);

    const tileMapArray = levelData.mapArray;
    this.addTilesFromMapArray(tileMapArray);

    this.mapDimensions = [tileMapArray[0].length, tileMapArray.length];
    this.addTrainersFromLevelData(levelData);
  }

  getTileFromColRow(col: number, row: number) {
    return this.tileLookupMap.get(this.createLookupKeyFromColRow(col, row));
  }

  getAdjacentTiles(tile: Tile) {
    const adjMap = new Map();
    adjMap.set("current", tile);

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

  addTrainersToContainer(container: Container) {
    for (const [_, trainer] of this.trainers) {
      container.addChild(trainer);
    }
  }

  private checkIfTexturesLoaded(levelData: any) {
    for (const tileset of levelData.tilesets) {
      if (!Loader.shared.resources[tileset]) {
        throw Error(
          `Cannot create level ${this.levelName} if ${tileset} is not loaded`
        );
      }
    }
  }

  private addTilesFromMapArray(tileMapArray: any) {
    for (let y = 0; y < tileMapArray.length; y++) {
      for (let x = 0; x < tileMapArray[0].length; x++) {
        const tileInfo = tileMapArray[y][x];
        this.addTileFromTileInfo(tileInfo, x, y);
      }
    }
  }

  private addTileFromTileInfo(
    tileInfo: any,
    tilemapCol: number,
    tilemapRow: number
  ) {
    const tile = new Tile(tileInfo, tilemapCol, tilemapRow);
    this.backgroundContainer.addChild(tile);

    if (tile.foreground) {
      this.foregroundContainer.addChild(tile.foreground);
    }

    this.tileLookupMap.set(
      this.createLookupKeyFromColRow(tilemapCol, tilemapRow),
      tile
    );
  }

  private addTrainersFromLevelData(levelData: any) {
    for (const [index, trainerInfo] of levelData.mapInfo.people.entries()) {
      const person = PersonFactory.createPersonFromTrainerInfo(trainerInfo);
      if (this.trainers.has(person.name)) {
        this.trainers.set(person.name + index, person);
      } else {
        this.trainers.set(person.name, person);
      }

      const [tileCol, tileRow] = trainerInfo.pos;
      this.getTileFromColRow(tileCol, tileRow)!.setGameObject(person);
    }
  }

  private createLookupKeyFromColRow(col: number, row: number) {
    return `${col}, ${row}`;
  }
}
