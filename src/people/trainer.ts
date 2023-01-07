import { Cardinality } from "../enums/cardinality";
import Person from "./person";
import { WalkingState } from "../enums/walkingState";
import { flipSpriteLeft, flipSpriteRight } from "../utils/flipSprite";

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

  update() {
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

    super.update(16.67);
  }

  setTexturesFromCardinality() {
    switch (this.cardinality) {
      case Cardinality.NORTH:
        this.frames = this.upTextures;
        break;

      case Cardinality.EAST:
        this.frames = this.leftTextures;
        flipSpriteRight(this);
        break;

      case Cardinality.WEST:
        this.frames = this.leftTextures;
        flipSpriteLeft(this);
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
}
