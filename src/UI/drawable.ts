import { Container, Sprite, Texture } from "pixi.js";

export default class Drawable extends Container {
  world_bound: boolean;
  isDead = false;
  sprite: Sprite;

  constructor(
    texture: Texture,
    position: [number, number],
    world_bound = true
  ) {
    super();

    this.sprite = new Sprite(texture);
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);
    this.sprite.y += this.sprite.pivot.y;
    this.addChild(this.sprite);

    [this.x, this.y] = position;
    this.world_bound = world_bound;
  }

  getSize() {
    return [this.width, this.height];
  }

  kill() {
    this.isDead = true;
  }

  flipRight() {
    if (this.sprite.scale.x !== -1) {
      this.sprite.scale.x = -1;
    }
  }

  flipLeft() {
    if (this.sprite.scale.x !== 1) {
      this.sprite.scale.x = 1;
    }
  }
}
