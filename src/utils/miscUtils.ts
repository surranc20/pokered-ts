import { Constants } from "../enums/constants";

/* Assumes 0,0 as the lower bound */
export function pointWithinBounds(
  x: number,
  y: number,
  maxX: number,
  maxY: number
) {
  return (0 <= x && x <= maxX) || (0 <= y && y <= maxY);
}

/* Both boundaries are inclusive */
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function debouncedResize() {
  let scale = Math.min(
    Math.floor(window.innerWidth / Constants.RESOLUTION_X),
    Math.floor(window.innerHeight / Constants.RESOLUTION_Y)
  );

  scale = Math.max(scale - 1, 1);
  document.getElementById("main-body")!.style.transform = `scale(${scale})`;
}

export function getPersonPositionFromTileCoords(
  coords: [number, number]
): [number, number] {
  return [
    coords[0] * Constants.X_TILE_SIZE,
    coords[1] * Constants.Y_TILE_SIZE - 8,
  ];
}

//(pos[0] + self.x_offset) * self.TILE_SIZE, pos[1] * self.TILE_SIZE - 8)
