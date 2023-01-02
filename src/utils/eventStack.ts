import GameEvent from "../events/gameEvent";

export default class EventStack {
  static instance: EventStack;
  stack: GameEvent[];

  private constructor() {
    this.stack = [];
  }

  public static getEventStack() {
    if (!EventStack.instance) {
      EventStack.instance = new EventStack();
    }
    return EventStack.instance;
  }

  pushEvent(event: GameEvent) {
    this.stack.push(event);
    if (event.onEnter) {
      event.onEnter();
    }
  }

  popEvent() {
    if (this.stack.length > 0) {
      const gameEvent = this.stack.pop();
      if (gameEvent?.onExit) {
        gameEvent.onExit();
      }
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
