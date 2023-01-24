import GameEvent from "./gameEvent";
import { useAsyncResourceLoad } from "../utils/useAsyncResourceLoad";
import Resources from "../models/resources";
import TileMap from "../UI/tiles/tileMap";
import Player from "../people/player";
import Trainer from "../people/trainer";
import { Constants } from "../enums/constants";

export default class Overworld extends GameEvent {
  tileMap!: TileMap;
  tilesetSheets: string[] = ["tileset_12", "tileset_14"];
  player!: Player;

  onEnter = async () => {
    await useAsyncResourceLoad(
      new Resources(
        this.tilesetSheets,
        [],
        ["trainer", "nurse", "clerk", "guard"]
      )
    );

    this.tileMap = new TileMap("indigo_center");
    await this.tileMap.createTileMap();

    this.player = Player.getPlayer();
    this.container.addChild(this.tileMap.backgroundContainer);

    this.tileMap.addTrainersToContainer(this.container);
    this.container.addChild(this.player);

    // Setup "camera"
    this.container.pivot.copyFrom(this.player.position);
    this.container.position.x = 120;
    this.container.position.y = 80;
  };

  update() {
    if (this.player) {
      const adjacentPlayerTiles = this.tileMap.getAdjacentTiles(
        this.getCurrentPlayerTile()
      );
      this.player.update(adjacentPlayerTiles);
      this.updateCamera();
    }
  }

  private updateCamera() {
    if (!this.isFollowObjApproachingHorizontalEdgeOfCamera(this.player)) {
      this.container.pivot.x = this.player.x;
    }
    this.container.pivot.y = this.player.y;
  }

  private isFollowObjApproachingHorizontalEdgeOfCamera(
    followObj: Trainer
  ): boolean {
    // TODO: Find formula that actually works and does not use
    // hard coded values
    return (
      followObj.x - 120 + followObj.getSize()[0] / 2 <= 0 ||
      followObj.x + followObj.getSize()[0] / 2 > 300
    );
  }

  private getCurrentPlayerTile() {
    const [tileCol, tileRow] = [
      Math.floor(this.player.x / Constants.X_TILE_SIZE),
      Math.floor((this.player.y + 6) / Constants.Y_TILE_SIZE),
    ];

    return this.tileMap.getTileFromColRow(tileCol, tileRow);
  }
}
