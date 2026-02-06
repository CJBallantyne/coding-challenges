import p5 from "p5";
import { P5Canvas } from "@p5-wrapper/react";

const p5Test = () => {
  const sketch = (p: p5) => {
    let x = 0;
    let y = 0;

    p.setup = () => {
      p.createCanvas(400, 400);
    };

    p.draw = () => {
      p.background(220);
      p.ellipse(x, y, 50, 50);
      x += 1;
      y += 1;
    };
  };

  return (
    <div>
      <h2>p5 Test Challenge</h2>
      <p>This is a test challenge using p5.js.</p>
      <P5Canvas sketch={sketch} />
    </div>
  );
};

export default p5Test;
