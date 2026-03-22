import { Cardinality } from "../enums/cardinality";
import { getPersonPositionFromTileCoords } from "../utils/miscUtils";
import Clerk from "./clerk";
import Nurse from "./nurse";
import Person from "./person";

export default class PersonFactory {
  static createPersonFromTrainerInfo(info: any) {
    const position: [number, number] = getPersonPositionFromTileCoords(
      info.pos
    );
    switch (info.name) {
      case "nurse":
        return new Nurse(
          position,
          Cardinality.getCardinalityFromString(info.orientation),
          info.dialogueId
        );
      case "clerk":
        return new Clerk(
          position,
          Cardinality.getCardinalityFromString(info.orientation),
          info.dialogueId
        );
      default:
        const trainer = new Person(
          info.name,
          position,
          Cardinality.getCardinalityFromString(info.orientation)
        );

        trainer.dialogueId = info.dialogueId;
        return trainer;
    }
  }
}
