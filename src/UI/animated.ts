import { Texture } from "pixi.js";
import Drawable from "./drawable";

export default class Animated extends Drawable {
  frames: Texture[];
  _animationTimer = 0;

  constructor(
    textures: Texture[],
    position: [number, number],
    public flip = false,
    public instant = false,
    public fps = 10,
    public animating = true,
    public currentFrame = 0
  ) {
    super(textures[0], position);
    this.frames = textures;
  }

  startAnimation = () => (this.animating = true);

  endAnimation = () => (this.animating = false);

  update(elapsedTime: number) {
    if (!this.animating) return;

    this._animationTimer += elapsedTime;
    if (this._animationTimer > 1 / this.fps) {
      this.currentFrame += 1;
      this.currentFrame %= this.frames.length;

      this._animationTimer -= 1 / this.fps;
      this.getTexture();
    }
  }

  getTexture() {
    this.texture = this.frames[this.currentFrame];
  }
}
