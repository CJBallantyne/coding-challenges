import { P5Canvas } from "@p5-wrapper/react";
import p5 from "p5";
import { Star } from "./star";
import { Ship } from "./ship";
import { ViewPort } from "./viewPort";
const SIZE = 1000;
const stars: Star[] = [];
const ship = new Ship(new p5.Vector(0, 0));
const viewPort = new ViewPort(SIZE / 2, SIZE / 2);

export const starSystem = () => {
  const sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(SIZE, SIZE, p5.WEBGL);
      const camera = new p5.Camera(p5.WEBGL);
      stars.push(new Star(new p5.Vector(0, 0), 100));
    };
    p.draw = () => {
      p.background(0);
      p.push();
      stars.forEach((star) => star.show(p));
      p.translate(viewPort.x, viewPort.y);

      ship.show(p, viewPort);
      p.pop();
      viewPort.update(ship);
      viewPort.show(p);
    };
  };

  return (
    <div>
      <P5Canvas sketch={sketch} />
    </div>
  );
};

export default starSystem;
