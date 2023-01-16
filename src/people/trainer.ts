import { Cardinality } from "../enums/cardinality";
import Person from "./person";
import { WalkingState } from "../enums/walkingState";
import Tile from "../UI/tiles/tile";

export default class Trainer extends Person {
  walkingState = WalkingState.STATIONARY;
  tilePixelOffset: number;

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

  update(_tileAdjacencyMap?: Map<Cardinality, Tile>) {
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

    super.update();
  }

  setTexturesFromCardinality() {
    switch (this.cardinality) {
      case Cardinality.NORTH:
        this.frames = this.upTextures;
        break;

      case Cardinality.EAST:
        this.frames = this.leftTextures;
        break;

      case Cardinality.WEST:
        this.frames = this.leftTextures;
        break;

      case Cardinality.SOUTH:
        this.frames = this.downTextures;
        break;
    }
    this.getTexture();
  }

  private moveAPixelInCurrentDirection() {
    switch (this.cardinality) {
      case Cardinality.NORTH:
        this.y -= 1;
        break;
      case Cardinality.EAST:
        this.x += 1;
        this.flipRight();
        break;
      case Cardinality.SOUTH:
        this.y += 1;
        break;
      case Cardinality.WEST:
        this.x -= 1;
        this.flipLeft();
        break;
    }
    this.tilePixelOffset += 1;
  }
}
