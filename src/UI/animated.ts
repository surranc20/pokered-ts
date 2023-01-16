import { Texture } from "pixi.js";
import Drawable from "./drawable";

export default class Animated extends Drawable {
  frames: Texture[];
  _updatesSinceLastFrame = 0;

  constructor(
    textures: Texture[],
    position: [number, number],
    public instant = false,
    public updatesPerFrame = 10,
    public animating = true,
    public currentFrame = 0
  ) {
    super(textures[0], position);
    this.frames = textures;
  }

  startAnimation() {
    this.animating = true;
  }

  endAnimation = () => (this.animating = false);

  update() {
    if (!this.animating) return;

    this._updatesSinceLastFrame += 1;
    if (this._updatesSinceLastFrame > this.updatesPerFrame) {
      this.currentFrame += 1;
      this.currentFrame %= this.frames.length;

      this._updatesSinceLastFrame = 0;
      this.getTexture();
    }
  }

  getTexture() {
    this.sprite.texture = this.frames[this.currentFrame];
  }
}
