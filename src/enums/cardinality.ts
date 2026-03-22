export enum Cardinality {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}

export namespace Cardinality {
  export function getCardinalityOffsetMap() {
    return new Map([
      [Cardinality.NORTH, [0, -1]],
      [Cardinality.EAST, [1, 0]],
      [Cardinality.SOUTH, [0, 1]],
      [Cardinality.WEST, [-1, 0]],
    ]);
  }

  export function getCardinalityFromString(
    cardinalityString: string
  ): Cardinality {
    return Cardinality[
      cardinalityString.toUpperCase() as keyof typeof Cardinality
    ] as Cardinality;
  }

  export function getOpposite(c: Cardinality): Cardinality {
    switch (c) {
      case Cardinality.NORTH: return Cardinality.SOUTH;
      case Cardinality.SOUTH: return Cardinality.NORTH;
      case Cardinality.EAST:  return Cardinality.WEST;
      case Cardinality.WEST:  return Cardinality.EAST;
    }
  }
}
