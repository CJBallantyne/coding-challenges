import p5 from "p5";
import { ViewPort } from "./viewPort";

export class Star {
  position: p5.Vector;
  diameter: number;

  constructor(position: p5.Vector, diameter: number) {
    this.position = position;
    this.diameter = diameter;
  }

  show(p: p5) {
    p.push();
    p.fill(255);
    p.circle(this.position.x, this.position.y, this.diameter);
    p.pop();
  }
}
