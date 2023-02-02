import { Loader } from "pixi.js";
import Drawable from "../drawable";
import { Constants } from "../../enums/constants";

export default class Tile extends Drawable {
  tilemapRow: number;
  tilemapCol: number;
  isCollidable: boolean;
  gameObj: any;
  baseCollidability: boolean;
  foreground: Drawable | null;

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
    this.baseCollidability = !!tileInfo.collidable;
    this.isCollidable = this.baseCollidability;
    this.gameObj = null;

    this.foreground = this.getForeground(tileset, tilesetCol, tilesetRow);
  }

  setGameObject(gameObj: any) {
    this.gameObj = gameObj;
    this.isCollidable = true;
  }

  removeGameObject() {
    this.gameObj = null;
    this.isCollidable = this.baseCollidability;
  }

  private getForeground(
    tileset: String,
    tilesetCol: String,
    tilesetRow: String
  ) {
    const foregroundTileset = tileset + "_foreground";
    const foregroundKey = `${tileset}_foreground ${tilesetCol},${tilesetRow}`;

    if (!Loader.shared.resources[foregroundTileset]?.textures![foregroundKey]) {
      return null;
    }

    const foregroundTexture =
      Loader.shared.resources[foregroundTileset].textures![foregroundKey];

    return new Drawable(foregroundTexture, [
      this.tilemapCol * Constants.X_TILE_SIZE,
      this.tilemapRow * Constants.Y_TILE_SIZE,
    ]);
  }
}
