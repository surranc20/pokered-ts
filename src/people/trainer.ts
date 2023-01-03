import { Cardinality } from "../enums/cardinality";
import Person from "./person";
import { WalkingState } from "../enums/walkingState";

export default class Trainer extends Person {
  walkingState = WalkingState.STATIONARY;

  constructor(
    name: string,
    position: [number, number],
    cardinality: Cardinality,
    isEnemy = true,
    gender = "male"
  ) {
    super(name, position, cardinality, isEnemy, gender);
    this.fps = 6;
  }

  update() {
    switch (this.walkingState) {
      case WalkingState.STATIONARY:
        break;

      case WalkingState.START_WALKING:
        this.setTexturesFromCardinality();
        this.walkingState = WalkingState.WALKING;
        break;

      case WalkingState.WALKING:
        break;
    }

    super.update(16.67);
  }
}
