import p5 from "p5";
import { ViewPort } from "./viewPort";

const DRAG = new p5.Vector(0.98, 0.98);

export class Ship {
  position: p5.Vector;
  velocity: p5.Vector;
  angle: p5.Vector;
  height: number;
  width: number;
  acceleration: number;
  maxSpeed: number;

  constructor(
    position: p5.Vector,
    velocity = new p5.Vector(0, 0),
    height = 40,
    width = 30,
  ) {
    this.position = position;
    this.velocity = velocity;
    this.angle = p5.Vector.fromAngle(0);
    this.height = height;
    this.width = width;
    this.acceleration = 0.5;
    this.maxSpeed = 20;
  }

  show(p: p5, viewPort: ViewPort) {
    this.angle = new p5.Vector(
      p.mouseX + viewPort.x - viewPort.width / 2 - this.position.x,
      p.mouseY + viewPort.y - viewPort.height / 2 - this.position.y,
    );
    p.push();
    p.translate(this.position.x, this.position.y);
    p.rotate(this.angle.heading() + Math.PI / 2);
    p.fill(255, 0, 0);
    p.stroke(255, 0, 0);

    //     p1       p1 => p2
    //     /\       p1 => p4
    //    /  \      p3 => p2
    //   / /\ \     p3 => p4
    // p2  p3  p4

    const p1 = new p5.Vector(0, -this.height / 2);
    const p2 = new p5.Vector(-this.width / 2, this.height / 2);
    const p3 = new p5.Vector(0, this.height / 4);
    const p4 = new p5.Vector(this.width / 2, this.height / 2);

    p.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    p.triangle(p1.x, p1.y, p4.x, p4.y, p3.x, p3.y);

    p.pop();
    p.stroke(255);
    p.fill(0, 0, 255);

    this.update();
    if (p.keyIsDown("w")) {
      this.accelerate();
    }
  }

  update() {
    if (this.velocity.mag() > this.maxSpeed) {
      this.velocity.setMag(this.maxSpeed);
    }
    this.position.x = this.position.x + this.velocity.x;
    this.position.y = this.position.y + this.velocity.y;
    this.velocity.mult(DRAG);
  }

  accelerate() {
    const deltaV = p5.Vector.fromAngle(this.angle.heading(), this.acceleration);
    this.velocity.add(deltaV);
  }
}
