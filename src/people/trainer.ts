import { Cardinality } from "../enums/cardinality";
import Person from "./person";
import { WalkingState } from "../enums/walkingState";
import Tile from "../UI/tiles/tile";

export default class Trainer extends Person {
  walkingState = WalkingState.STATIONARY;
  tilePixelOffset: number;
  currentTile: Tile | null = null;

  constructor(
    name: string,
    position: [number, number],
    cardinality: Cardinality,
    isEnemy = true,
    gender = "male"
  ) {
    super(name, position, cardinality, isEnemy, gender);
    this.fps = 6;
    this.animating = false;
    this.tilePixelOffset = 0;
  }

  update(tileAdjacencyMap?: Map<Cardinality | String, Tile>) {
    this.updateCurrentTile(tileAdjacencyMap);
    switch (this.walkingState) {
      case WalkingState.STATIONARY:
        if (this.currentFrame !== 0) {
          this.currentFrame = 0;
          this.getTexture();
        }
        break;

      case WalkingState.START_WALKING:
        this.setTexturesFromCardinality();
        this.walkingState = WalkingState.WALKING;
        this.startAnimation();
      // Break omission is intentional...Immediately begin walking

      case WalkingState.WALKING:
        this.moveAPixelInCurrentDirection();
        if (this.tilePixelOffset == 16) {
          this.walkingState = WalkingState.STATIONARY;
          this.tilePixelOffset = 0;
          this.endAnimation();
        }
        break;
    }
    this.updateZIndex();
    super.update();
  }

  private updateCurrentTile(
    tileAdjacencyMap?: Map<Cardinality | String, Tile>
  ) {
    if (tileAdjacencyMap?.get("current") !== this.currentTile) {
      this.currentTile?.removeGameObject();
      this.currentTile = tileAdjacencyMap!.get("current")!;
      this.currentTile.setGameObject(this);
    }
  }

  private moveAPixelInCurrentDirection() {
    switch (this.cardinality) {
      case Cardinality.NORTH:
        this.y -= 1;
        break;
      case Cardinality.EAST:
        this.x += 1;
        break;
      case Cardinality.SOUTH:
        this.y += 1;
        break;
      case Cardinality.WEST:
        this.x -= 1;
        break;
    }
    this.tilePixelOffset += 1;
  }

  updateZIndex() {
    if (this.currentTile) {
      super.updateZIndex(this.currentTile.tilemapRow);
    }
  }
}
