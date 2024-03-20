import { useRef, useEffect, useLayoutEffect } from "preact/hooks";

type CanvasProps = {
  width?: number;
  height?: number;
};

export function Canvas({ width = 256, height = 256 }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // drawing
  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) draw(gc);
  }, []);

  function draw(gc: CanvasRenderingContext2D) {
    gc.fillStyle = "black";
    gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);

    gc.fillStyle = "red";

    // 100 random points
    [...Array(100)].forEach((_) => {
      const [x, y] = [Math.random() * width, Math.random() * height];
      gc.beginPath();
      gc.arc(x, y, 5, 0, 2 * Math.PI);
      gc.fill();
    });
  }

  return <canvas ref={canvasRef} width={width} height={height} />;
}
