export const insideHitTestCircle = (
  mx: number,
  my: number,
  x: number,
  y: number,
  r: number
) => (mx - x) ** 2 + (my - y) ** 2 <= r ** 2;

export const insideHitTestCentredRectangle = (
  mx: number,
  my: number,
  x: number,
  y: number,
  width: number,
  height: number
) =>
  mx >= x - width / 2 &&
  mx <= x + width / 2 &&
  my >= y - height / 2 &&
  my <= y + height / 2;

export const rotate = (
  x: number,
  y: number,
  angle: number,
  cx = 0,
  cy = 0
) => [
  (x - cx) * Math.cos(angle) - (y - cy) * Math.sin(angle) + cx,
  (x - cx) * Math.sin(angle) + (y - cy) * Math.cos(angle) + cy,
];

export function drawCross(
  gc: CanvasRenderingContext2D,
  x: number,
  y: number,
  size = 5
) {
  gc.beginPath();
  gc.moveTo(x - size, y);
  gc.lineTo(x + size, y);
  gc.moveTo(x, y - size);
  gc.lineTo(x, y + size);
  gc.lineWidth = 1;
  gc.stroke();
}
