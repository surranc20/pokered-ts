import GameEvent from "./gameEvent";

export default class Overworld extends GameEvent {
  update(): void {
    console.log("overworld update");
  }
}
