import p5 from "p5";
import Paddle from "./paddle";

export class Ball {
  x: number;
  y: number;
  radius: number;
  speed: number;
  velocity: p5.Vector;

  constructor(x: number, y: number, radius = 5, speed = 4) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    const angle = (Math.random() * Math.PI) / 4 - Math.PI / 8; // Random angle between -22.5 to 22.5 degrees
    const direction = Math.random() < 0.5 ? -1 : 1;
    this.velocity = p5.Vector.fromAngle(angle, speed * direction);
  }

  show(p: p5) {
    p.fill(255);
    p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  update() {
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }

  checkPaddleCollision(p: p5, paddle: Paddle) {
    if (
      this.x - this.radius < paddle.x + paddle.width &&
      this.x + this.radius > paddle.x &&
      this.y - this.radius < paddle.y + paddle.height &&
      this.y + this.radius > paddle.y
    ) {
      //Trying to do better collision response but it just makes the ball go crazy
      // const angle = this.velocity.heading() + Math.PI; // Reverse direction
      // const angleChange = (Math.random() * Math.PI) / 4 - Math.PI / 8;
      // const angleChangeMagnitude =
      //   this.y - (paddle.y + paddle.height / 2) / (paddle.height / 2);
      // const finalAngle = angle + angleChange * angleChangeMagnitude;
      // const direction = this.velocity.x > 0 ? -1 : 1;
      // this.velocity = p5.Vector.fromAngle(finalAngle, this.speed * direction);
      this.velocity.x = -this.velocity.x;
    }
  }

  checkWallCollision(p: p5) {
    if (this.y - this.radius < 0 || this.y + this.radius > p.height) {
      this.velocity.setHeading(-this.velocity.heading());
    }
    if (this.x + this.radius < 0 || this.x - this.radius > p.width) {
      this.x = p.width / 2;
      this.y = p.height / 2;
    }
  }
}

export default Ball;
