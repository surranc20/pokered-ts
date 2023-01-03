import { Cardinality } from "../enums/cardinality";
import { WalkingState } from "../enums/walkingState";
import Trainer from "./trainer";
import Keyboard from "pixi.js-keyboard";

export default class Player extends Trainer {
  static instance: Player;
  private static movementKeys = [
    "KeyW",
    "ArrowUp",
    "KeyS",
    "ArrowDown",
    "KeyA",
    "ArrowLeft",
    "KeyD",
    "ArrowRight",
  ];

  private constructor() {
    super("player", [20, 20], Cardinality.SOUTH, false, "male");
  }

  public static getPlayer(): Player {
    if (!Player.instance) {
      Player.instance = new Player();
    }
    return Player.instance;
  }

  update() {
    if (Keyboard.isKeyDown(...Player.movementKeys)) {
      switch (this.walkingState) {
        case WalkingState.STATIONARY:
          this.setCardinalityFromKeyboard();
          this.walkingState = WalkingState.START_WALKING;
          break;

        case WalkingState.START_WALKING:
          break;

        case WalkingState.WALKING:
          break;
      }
    }

    super.update();
  }

  setCardinalityFromKeyboard() {
    if (Keyboard.isKeyDown("KeyW", "ArrowUp"))
      this.cardinality = Cardinality.NORTH;
    if (Keyboard.isKeyDown("KeyS", "ArrowDown"))
      this.cardinality = Cardinality.SOUTH;
    if (Keyboard.isKeyDown("KeyA", "ArrowLeft"))
      this.cardinality = Cardinality.WEST;
    if (Keyboard.isKeyDown("KeyD", "ArrowRight"))
      this.cardinality = Cardinality.EAST;
  }
}
