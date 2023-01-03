import GameEvent from "./gameEvent";
import { useAsyncResourceLoad } from "../utils/useAsyncResourceLoad";
import Resources from "../models/resources";
import TileMap from "../UI/tiles/tileMap";
import Player from "../people/player";

export default class Overworld extends GameEvent {
  tileMap!: TileMap;
  tilesetSheets: string[] = ["tileset_12", "tileset_14"];
  player!: Player;

  onEnter = async () => {
    await useAsyncResourceLoad(new Resources(this.tilesetSheets, ["trainer"]));

    this.tileMap = new TileMap("indigo_center");
    await this.tileMap.createTileMap();
    this.player = Player.getPlayer();
    this.container.addChild(this.tileMap.backgroundContainer);
    this.container.addChild(this.player);
  };

  update() {
    if (this.player) {
      this.player.update();
    }
  }
}
