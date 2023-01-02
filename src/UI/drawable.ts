import { Sprite, Texture } from "pixi.js";

export default class Drawable extends Sprite {
  world_bound: boolean;
  isDead = false;

  constructor(
    texture: Texture,
    position: [number, number],
    world_bound = true
  ) {
    super(texture);
    [this.x, this.y] = position;
    this.world_bound = world_bound;
  }

  getSize() {
    return [this.width, this.height];
  }

  kill() {
    this.isDead = true;
  }
}
