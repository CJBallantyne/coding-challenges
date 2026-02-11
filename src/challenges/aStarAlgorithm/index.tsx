import { P5Canvas } from "@p5-wrapper/react";
import p5 from "p5";
import { NODE_SIZE } from "./aStarNode";
import AStarGrid from "./aStarGrid";
import { SolvedState } from "./aStarGrid";
import { Alert } from "react-bootstrap";
import { useState } from "react";

export const aStarAlgorithm = () => {
  const [solvedState, setSolvedState] = useState<SolvedState>(
    SolvedState.IN_PROGRESS,
  );

  const sketch = (p: p5) => {
    const numRows = 40;
    const numCols = 40;
    const grid: AStarGrid = new AStarGrid(numRows, numCols);

    p.setup = () => {
      p.createCanvas(numRows * NODE_SIZE, numCols * NODE_SIZE);
    };
    p.draw = () => {
      p.background(220);
      grid.show(p);
      const state = grid.attemptToSolve();
      if (state === SolvedState.SOLVED) {
        setSolvedState(SolvedState.SOLVED);
        p.noLoop();
      }
      if (state === SolvedState.FAILED_TO_SOLVE) {
        setSolvedState(SolvedState.FAILED_TO_SOLVE);
        p.noLoop();
      }
    };
  };

  return (
    <div>
      {solvedState == SolvedState.IN_PROGRESS && (
        <Alert variant="primary">Solution in progess...</Alert>
      )}
      {solvedState == SolvedState.SOLVED && (
        <Alert variant="success">Solution Completed!</Alert>
      )}
      {solvedState == SolvedState.FAILED_TO_SOLVE && (
        <Alert variant="danger">Failed to find solution.</Alert>
      )}

      <P5Canvas sketch={sketch} />
    </div>
  );
};

export default aStarAlgorithm;
