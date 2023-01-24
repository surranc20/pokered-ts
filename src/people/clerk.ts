import { Cardinality } from "../enums/cardinality";
import Person from "./person";

export default class Clerk extends Person {
  constructor(position: [number, number], cardinality: Cardinality) {
    super("clerk", position, cardinality, true, "female");
  }
}
