import p5 from "p5";

export class Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  yVelocity: number;
  speed: number;

  constructor(x: number, y: number, width = 10, height = 100) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.yVelocity = 0;
    this.speed = 5;
  }

  show(p: p5) {
    p.fill(255);
    p.rect(this.x, this.y, this.width, this.height);
  }

  moveUp() {
    this.y = this.y - 5;
  }

  moveDown() {
    this.y = this.y + 5;
  }
}

export default Paddle;
