import p5 from "p5";
import AStarGrid from "./aStarGrid";

export const NODE_SIZE = 20;

export class AStarNode {
  row: number;
  col: number;
  // The cost function is defined as: f(n) = g(n) + h(n)
  // g(n) The actual, known cost (e.g., distance or time) from the initial starting node to the current node.
  // h(n): The estimated heuristic cost from the current node to the final goal node. This is essentially an "intelligent guess" that helps the algorithm prioritize paths that seem to be heading in the right direction.
  // f(n): The total estimated cost of the path from the start to the goal, going via node \(n\).
  fCost: number | null;
  gCost: number | null;
  hCost: number | null;

  #isBlocked: boolean;
  #isInOpenSet: boolean = false;
  #isInClosedSet: boolean = false;

  parent: AStarNode | null;

  constructor(row: number, col: number, isBlocked = false) {
    this.row = row;
    this.col = col;
    this.#isBlocked = isBlocked;
    this.fCost = null;
    this.gCost = null;
    this.hCost = null;
    this.parent = null;
  }

  setFill(p: p5) {
    if (this.#isBlocked) {
      p.fill(0);
    } else if (this.#isInClosedSet) {
      p.fill(255, 0, 0);
    } else if (this.#isInOpenSet) {
      p.fill(0, 255, 0);
    } else {
      p.fill(255);
    }
  }

  drawPath(p: p5) {
    p.stroke(0);
    p.fill(0, 100, 255);
    p.rect(this.row * NODE_SIZE, this.col * NODE_SIZE, NODE_SIZE, NODE_SIZE);
    if (this.parent !== null) {
      this.parent.drawPath(p);
    }
  }

  show(p: p5) {
    p.stroke(0);
    this.setFill(p);
    p.rect(this.row * NODE_SIZE, this.col * NODE_SIZE, NODE_SIZE, NODE_SIZE);
  }

  getNeighbors(grid: AStarGrid): AStarNode[] {
    // [-1,-1]  [-1, 0] [-1, +1]
    // [ 0,-1]  [ 0, 0] [ 0, +1]
    // [+1,-1]  [+1, 0] [+1, +1]

    const neighbors: AStarNode[] = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newNeighbor = grid.nodes[this.row + i]?.[this.col + j];
        if (
          newNeighbor &&
          !newNeighbor.#isBlocked &&
          !newNeighbor.#isInClosedSet &&
          !newNeighbor.#isInOpenSet
        ) {
          neighbors.push(newNeighbor);
        }
      }
    }
    return neighbors;
  }

  setIsBlocked(isBlocked: boolean) {
    this.#isBlocked = isBlocked;
  }

  getCoordString() {
    return `${this.row},${this.col}`;
  }

  addToOpenSet() {
    if (!this.#isInClosedSet && !this.#isBlocked) {
      this.#isInOpenSet = true;
    }
  }

  moveToClosedSet() {
    if (this.#isInOpenSet) {
      this.#isInOpenSet = false;
      this.#isInClosedSet = true;
    }
  }
}

export default AStarNode;
