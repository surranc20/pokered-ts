import { Sprite } from "pixi.js";

export function flipSpriteRight(sprite: Sprite) {
  if (sprite.scale.x === 1) {
    sprite.scale.x = -1;
    sprite.x += sprite.width;
  }
}

export function flipSpriteLeft(sprite: Sprite) {
  if (sprite.scale.x === -1) {
    sprite.scale.x = 1;
    sprite.x -= sprite.width;
  }
}
