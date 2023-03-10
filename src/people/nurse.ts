import { Cardinality } from "../enums/cardinality";
import Person from "./person";

export default class Nurse extends Person {
  constructor(position: [number, number], cardinality: Cardinality) {
    super("nurse", position, cardinality, true, "female");
  }
}
