import { useEffect, useRef } from "react";
import p5 from "p5";

export default function P5Canvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(400, 400);
      };

      p.draw = () => {
        p.background(200);
        p.circle(p.mouseX, p.mouseY, 50);
      };
    };

    const instance = new p5(sketch, containerRef.current!);

    return () => {
      instance.remove(); // VERY important cleanup
    };
  }, []);

  return <div ref={containerRef} />;
}
