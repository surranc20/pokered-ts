/* Assumes 0,0 as the lower bound */
export function pointWithinBounds(
  x: number,
  y: number,
  maxX: number,
  maxY: number
) {
  return (0 <= x && x <= maxX) || (0 <= y && y <= maxY);
}
