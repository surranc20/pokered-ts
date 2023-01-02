import { Texture } from "pixi.js";
import Animated from "./animated";
import { Cardinality } from "../enums/cardinality";

export default class Mobile extends Animated {
  constructor(
    textures: Texture[],
    position: [number, number],
    public cardinality: Cardinality,
    public fps = 10,
    public animating = true,
    public currentFrame = 0
  ) {
    super(textures, position);

    if (this.cardinality === Cardinality.EAST) {
      this.flip = true;
    }
  }
}
