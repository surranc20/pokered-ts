import GameEvent from "./gameEvent";
import { useAsyncResourceLoad } from "../utils/useAsyncResourceLoad";
import Resources from "../models/resources";
import TileMap from "../UI/tiles/tileMap";

export default class Overworld extends GameEvent {
  tileMap!: TileMap;
  update(): void {}
  tilesetSheets: string[] = ["tileset_12", "tileset_14"];

  onEnter = async () => {
    await useAsyncResourceLoad(new Resources(this.tilesetSheets));

    this.tileMap = new TileMap("indigo_center");
    await this.tileMap.createTileMap();

    this.container.addChild(this.tileMap.backgroundContainer);
  };
}
