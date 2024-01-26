export abstract class SKElement {
  constructor() {}

  x = 0;
  y = 0;
  width = 32;
  height = 32;

  abstract draw(gc: CanvasRenderingContext2D): void;
}
