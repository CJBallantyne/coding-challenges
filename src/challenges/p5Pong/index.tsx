import p5 from "p5";
import { P5Canvas } from "@p5-wrapper/react";
import { Paddle } from "./paddle";
import { Ball } from "./ball";

const p5Pong = () => {
  const sketch = (p: p5) => {
    let player1 = new Paddle(10, 200);
    let player2 = new Paddle(380, 200);
    let balls: Ball[] = [];

    p.setup = () => {
      p.createCanvas(400, 400);
      balls.push(new Ball(p.width / 2, p.height / 2));
    };

    p.draw = () => {
      p.background(220);
      player1.show(p);
      player2.show(p);
      if (p.keyIsDown("w")) {
        player1.moveUp();
      } else if (p.keyIsDown("s")) {
        player1.moveDown();
      }
      if (p.keyIsDown(p.UP_ARROW)) {
        player2.moveUp();
      } else if (p.keyIsDown(p.DOWN_ARROW)) {
        player2.moveDown();
      }
      balls.forEach((ball) => {
        ball.update();
        ball.checkPaddleCollision(p, player1);
        ball.checkPaddleCollision(p, player2);
        ball.checkWallCollision(p);
        ball.show(p);
      });
    };
  };

  return <P5Canvas sketch={sketch} />;
};

export default p5Pong;
