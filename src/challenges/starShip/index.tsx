import { P5Canvas } from "@p5-wrapper/react";
import p5 from "p5";
import { Star } from "./star";
import { Ship } from "./ship";
import { ViewPort } from "./viewPort";
const SYSTEM_SIZE = 5000;
const CANVAS_SIZE = 1000;
const stars: Star[] = [];
const ship = new Ship(new p5.Vector(SYSTEM_SIZE / 2, SYSTEM_SIZE / 2));
const viewPort = new ViewPort(
  SYSTEM_SIZE / 2,
  SYSTEM_SIZE / 2,
  CANVAS_SIZE,
  CANVAS_SIZE,
);

export const starSystem = () => {
  const sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      for (let i = 0; i < 500; i++) {
        stars.push(
          new Star(
            new p5.Vector(
              p.map(p.noise(i), 0, 1, -SYSTEM_SIZE, SYSTEM_SIZE),
              p.map(p.noise(i + 500), 0, 1, -SYSTEM_SIZE, SYSTEM_SIZE),
            ),
            p.map(Math.random(), 0, 1, 5, 10),
          ),
        );
      }
    };
    p.draw = () => {
      p.background(0);
      p.push();
      // CENTER THE VIEWPORT
      p.translate(
        -viewPort.x + viewPort.width / 2,
        -viewPort.y + viewPort.height / 2,
      );
      stars.forEach((star) => {
        star.show(p);
      });
      ship.show(p, viewPort);
      p.pop();

      viewPort.update(ship);
    };
    p.keyPressed = () => {
      if (p.keyIsDown(" ")) {
        viewPort.x = viewPort.x - 10;
      }
    };
  };

  return (
    <div>
      <P5Canvas sketch={sketch} />
    </div>
  );
};

export default starSystem;
