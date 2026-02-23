import { Ship } from "./ship";
import p5 from "p5";

const FOLLOW_DISTANCE = 200;

export class ViewPort {
  x: number;
  y: number;
  width: number;
  height: number;
  followDistance: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.followDistance = FOLLOW_DISTANCE;
  }

  update(ship: Ship) {
    if (this.x - ship.position.x > FOLLOW_DISTANCE) {
      this.x = ship.position.x + FOLLOW_DISTANCE;
    } else if (this.x - ship.position.x < -FOLLOW_DISTANCE) {
      this.x = ship.position.x - FOLLOW_DISTANCE;
    }
    if (this.y - ship.position.y > FOLLOW_DISTANCE) {
      this.y = ship.position.y + FOLLOW_DISTANCE;
    } else if (this.y - ship.position.y < -FOLLOW_DISTANCE) {
      this.y = ship.position.y - FOLLOW_DISTANCE;
    }
  }

  show(p: p5) {
    p.push();
    p.fill(0, 0, 0, 0);
    p.stroke(255);
    p.strokeWeight(4);
    p.square(10, 10, 100);
    p.pop();
  }
}
