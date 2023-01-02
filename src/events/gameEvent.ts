import { Container } from "pixi.js";

export default abstract class GameEvent {
  container: Container;
  showEvent: boolean;

  constructor(
    public onEnter: Function | null = null,
    public onExit: Function | null = null
  ) {
    this.container = new Container();
    this.showEvent = true;
  }

  abstract update(): void;

  toggleVisibility() {
    this.showEvent = !this.showEvent;
    this.container.visible = this.showEvent;
  }
}
