import { Constants } from "../enums/constants";

export default class GameTicker {
  stop = false;
  frameCount = 0;
  ticks = 0;
  fps: number;
  milliseondsInFrame: number;
  then!: number;
  startTime!: number;
  renderCallback: () => void;
  logicCallback: Function;

  constructor(
    fps: number,
    renderCallback: () => void,
    logicCallback: Function
  ) {
    this.fps = fps;
    this.milliseondsInFrame = Constants.MILLISECS_IN_A_SEC / this.fps;
    this.renderCallback = renderCallback;
    this.logicCallback = logicCallback;
  }

  startTicking() {
    this.then = Date.now();
    this.startTime = this.then;
    this.logicTick();
    this.renderTick();
  }

  private logicTick = () => {
    const now = Date.now();
    this.ticks += now - this.then;

    while (this.ticks > this.milliseondsInFrame) {
      this.ticks -= this.milliseondsInFrame;
      this.logicCallback(this.milliseondsInFrame);
    }
    this.then = now;
    setTimeout(this.logicTick, this.milliseondsInFrame);
  };

  private renderTick = () => {
    this.renderCallback();
    requestAnimationFrame(this.renderTick);
  };
}
