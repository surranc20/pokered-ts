import { Container } from "pixi.js";
import EventStack from "./eventStack";
import Overworld from "../events/Overworld";
import Keyboard from "pixi.js-keyboard";

export default class GameManager {
  eventStack: any;
  container: Container;
  constructor() {
    this.container = new Container();
    this.eventStack = EventStack.getEventStack(this.container);
    this.eventStack.pushEvent(new Overworld());
  }

  update() {
    Keyboard.update();
    if (this.eventStack.stack.length > 0) {
      this.eventStack.peekEvent().update();
    }
  }

  initialLoad(callback: Function) {
    callback();
  }
}
