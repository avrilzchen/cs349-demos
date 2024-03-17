import {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "preact/hooks";

type CanvasProps = {
  width?: number;
  height?: number;
};

export function Canvas({
  width: widthInit = 256,
  height: heightInit = 256,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // local state for canvas size
  const [width, setWidth] = useState(widthInit);
  const [height, setHeight] = useState(heightInit);

  useLayoutEffect(() => {
    console.log(`useEffect`);

    // watch for resize events
    const resizeObserver = new ResizeObserver(() => {
      // this should never happen
      if (!canvasRef.current) throw new Error("Canvas not found");

      const w = canvasRef.current.offsetWidth;
      const h = canvasRef.current.offsetHeight;

      console.log(`ResizeObserver: ${w}, ${h}`);

      // update the state if the size has changed
      if (w != width) {
        setWidth(w);
      }
      if (h != height) {
        setHeight(h);
      }
    });

    if (canvasRef.current) resizeObserver.observe(canvasRef.current);

    return () => {
      // cleanup by removing from ResizeObserver
      resizeObserver.disconnect();
    };
  }, []);

  // drawing
  // (try useEffect and see difference)
  useLayoutEffect(() => {
    const gc = canvasRef.current?.getContext("2d");
    if (gc) draw(gc);
  }, [width, height]);

  function draw(gc: CanvasRenderingContext2D) {
    gc.fillStyle = "black";
    gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);

    gc.fillStyle = "red";
    gc.beginPath();
    const r = Math.min(width, height) / 4;
    gc.arc(width / 2, height / 2, r, 0, 2 * Math.PI);
    gc.fill();

    gc.strokeStyle = "white";
    gc.beginPath();
    gc.moveTo(0, 0);
    gc.lineTo(width, height);
    gc.moveTo(width, 0);
    gc.lineTo(0, height);
    gc.stroke();

    gc.fillStyle = "white";
    gc.textAlign = "center";
    gc.textBaseline = "middle";
    gc.font = "20px sans-serif";
    gc.fillText(`${width},${height}`, width / 2, 20);
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
