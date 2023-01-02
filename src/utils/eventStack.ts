import { Container } from "pixi.js";
import GameEvent from "../events/gameEvent";

export default class EventStack {
  static instance: EventStack;
  stack: GameEvent[];

  private constructor(public container: Container) {
    this.stack = [];
  }

  public static getEventStack(container: Container) {
    if (!EventStack.instance) {
      EventStack.instance = new EventStack(container);
    }
    return EventStack.instance;
  }

  pushEvent(event: GameEvent) {
    this.stack.push(event);
    if (event.onEnter) {
      this.container.addChild(event.container);
      event.onEnter();
    }
  }

  popEvent() {
    if (this.stack.length > 0) {
      const gameEvent = this.stack.pop();
      if (gameEvent?.onExit) {
        gameEvent.onExit();
      }
      this.container.removeChild(gameEvent!.container);
      return gameEvent;
    } else {
      throw Error("Can't pop from an empty stack");
    }
  }

  peekEvent() {
    if (this.stack.length > 0) {
      return this.stack[this.stack.length - 1];
    }
  }
}
