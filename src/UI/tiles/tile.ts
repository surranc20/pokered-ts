import { Loader } from "pixi.js";
import Drawable from "../drawable";
import { Constants } from "../../enums/constants";

export default class Tile extends Drawable {
  constructor(tileInfo: any, x: number, y: number) {
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

    super(texture, [x * Constants.X_TILE_SIZE, y * Constants.Y_TILE_SIZE]);
  }
}
