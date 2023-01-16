import { Loader } from "pixi.js";
import Drawable from "../drawable";
import { Constants } from "../../enums/constants";

export default class Tile extends Drawable {
  tilemapRow: number;
  tilemapCol: number;
  isCollidable: boolean;
  constructor(tileInfo: any, tilemapCol: number, tilemapRow: number) {
    const tileset = tileInfo.tileBackground.tileSetName.replace(".png", "");
    const tilesetRow = tileInfo.tileBackground.rowNum;
    const tilesetCol = tileInfo.tileBackground.columnNum;
    const tileKey = `${tileset} ${tilesetCol},${tilesetRow}`;

    const texture = Loader.shared.resources[tileset].textures![tileKey];

    if (!texture) {
      throw Error(
        `Unable to load tile texture for tileset ${tileset} for tile ${tileKey}`
      );
    }

    super(texture, [
      tilemapCol * Constants.X_TILE_SIZE,
      tilemapRow * Constants.Y_TILE_SIZE,
    ]);
    this.tilemapCol = tilemapCol;
    this.tilemapRow = tilemapRow;
    this.isCollidable = !!tileInfo.collidable;
  }
}
