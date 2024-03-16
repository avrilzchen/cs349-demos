// https://www.turing.com/kb/canvas-components-in-react

import {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "preact/hooks";

type CanvasProps = {
  point: { x: number; y: number };
  width?: number;
  height?: number;
  callback?: (x: number, y: number) => void;
};

export function Canvas({
  point,
  width = 256,
  height = 256,
  callback,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // initial point is set to point property
  const [movePoint, setMovePoint] = useState(point);

  const clickHandler = (e: MouseEvent) => {
    // send click point to parent
    if (callback) callback(e.offsetX, e.offsetY);
  };

  const moveHandler = (e: MouseEvent) => {
    // update local state
    setMovePoint({ x: e.offsetX, y: e.offsetY });
  };

  // drawing
  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) draw(gc);
  }),
    [movePoint];

  function draw(gc: CanvasRenderingContext2D) {
    gc.fillStyle = "black";
    gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);

    // local state point
    gc.fillStyle = "red";
    gc.beginPath();
    gc.arc(movePoint.x, movePoint.y, 10, 0, 2 * Math.PI);
    gc.fill();

    // property  point
    gc.strokeStyle = "yellow";
    gc.beginPath();
    gc.arc(point.x, point.y, 10, 0, 2 * Math.PI);
    gc.stroke();

    // show points
    gc.font = "14px sans-serif";
    gc.fillStyle = "yellow";
    gc.fillText(`${point.x}, ${point.y}`, 8, 20);
    gc.fillStyle = "red";
    gc.fillText(`${movePoint.x}, ${movePoint.y}`, 8, 20 + 20);
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={moveHandler}
      onClick={clickHandler}
    />
  );
}
