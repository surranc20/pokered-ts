import { Cardinality } from "../enums/cardinality";
import { getPersonPositionFromTileCoords } from "../utils/miscUtils";
import Person from "./person";

export default class PersonFactory {
  static createPersonFromTrainerInfo(info: any) {
    debugger;
    const position: [number, number] = getPersonPositionFromTileCoords(
      info.pos
    );
    switch (info.name) {
      case "nurse":
        return new Person(
          info.name,
          position,
          Cardinality.getCardinalityFromString(info.orientation)
        );
      case "clerk":
        return new Person(
          info.name,
          position,
          Cardinality.getCardinalityFromString(info.orientation)
        );
      default:
        return new Person(
          info.name,
          position,
          Cardinality.getCardinalityFromString(info.orientation)
        );
    }
  }
}
