import Tile from "../UI/tiles/tile";
import { Cardinality } from "../enums/cardinality";
import { Constants } from "../enums/constants";
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
    const [x, y] = [12 * Constants.X_TILE_SIZE, 16 * Constants.Y_TILE_SIZE - 6];
    super("player", [x, y], Cardinality.NORTH, false, "male");
  }

  public static getPlayer(): Player {
    if (!Player.instance) {
      Player.instance = new Player();
    }
    return Player.instance;
  }

  update(tileAdjacencyMap?: Map<Cardinality, Tile>) {
    if (Keyboard.isKeyDown(...Player.movementKeys)) {
      switch (this.walkingState) {
        case WalkingState.STATIONARY:
          this.setCardinalityFromKeyboard();
          this.walkAheadIfClearElsePlayWallSound(tileAdjacencyMap!!);
          break;

        case WalkingState.START_WALKING:
          break;

        case WalkingState.WALKING:
          break;
      }
    }

    super.update(tileAdjacencyMap);
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

  private walkAheadIfClearElsePlayWallSound(
    tileAdjacencyMap: Map<Cardinality, Tile>
  ) {
    if (!tileAdjacencyMap.get(this.cardinality)?.isCollidable) {
      this.walkingState = WalkingState.START_WALKING;
    } else {
      // TODO: Play wall sound. Probably should do some debouncing
    }
  }
}
