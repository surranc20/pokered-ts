import { Container, Loader } from "pixi.js";
import EventStack from "./eventStack";
import Overworld from "../events/Overworld";

export default class GameManager {
  eventStack: any;
  container: Container;
  constructor() {
    this.eventStack = EventStack.getEventStack();
    this.eventStack.pushEvent(new Overworld());
    this.container = new Container();
  }

  update() {
    if (this.eventStack.stack.length > 0) {
      this.eventStack.peekEvent().update();
    }
  }

  initialLoad(callback: Function) {
    const loader = Loader.shared;
    loader.add("pokemonSpritesheet", "/assets/pokemonSpritesheet.json");
    loader.load(() => {
      console.log("done loading");
      callback();
    });
  }
}
