import AStarNode from "./aStarNode";
import p5 from "p5";
import { NODE_SIZE } from "./aStarNode";

export enum SolvedState {
  SOLVED = "SOLVED",
  IN_PROGRESS = "IN_PROGRESS",
  FAILED_TO_SOLVE = "FAILED_TO_SOLVE",
}

export class AStarGrid {
  nodes: AStarNode[][];
  startNode: AStarNode;
  endNode: AStarNode;
  currentNode: AStarNode | null;
  openSet: Map<string, AStarNode>;
  closedSet: Map<string, AStarNode>;
  pathSet: Map<string, AStarNode>;

  constructor(numRows: number, numCols: number, isBlockedChance: number = 0) {
    this.nodes = [];
    this.openSet = new Map<string, AStarNode>();
    this.closedSet = new Map<string, AStarNode>();
    this.pathSet = new Map<string, AStarNode>();
    this.currentNode = null;

    for (let i = 0; i < numCols; i++) {
      this.nodes.push([]);
      for (let j = 0; j < numRows; j++) {
        this.nodes[i].push(
          new AStarNode(i, j, Math.random() < isBlockedChance),
        );
      }
    }

    this.startNode = this.nodes[0][0];
    this.endNode = this.nodes[numCols - 1][numRows - 1];
    this.startNode.gCost = 0;
    this.startNode.hCost = this.getDistance(this.startNode, this.endNode);
    this.startNode.setIsBlocked(false);
    this.endNode.setIsBlocked(false);
    this.addNodeToOpenSet(this.startNode);
  }

  show(p: p5) {
    this.nodes.forEach((row) => {
      row.forEach((node) => {
        node.show(p);
      });
    });
    p.stroke(255, 150, 50);
    const strokeWidth = 4;
    p.strokeWeight(strokeWidth);
    p.noFill();
    p.rect(
      this.endNode.row * NODE_SIZE + strokeWidth,
      this.endNode.col * NODE_SIZE + strokeWidth,
      NODE_SIZE - 2 * strokeWidth,
      NODE_SIZE - 2 * strokeWidth,
    );
    if (this.currentNode) {
      this.currentNode.drawPath(p);
    }
  }

  addNodeToOpenSet(node: AStarNode) {
    node.addToOpenSet();
    this.openSet.set(node.getCoordString(), node);
  }

  moveNodeToClosedSet(node: AStarNode) {
    node.moveToClosedSet();
    this.openSet.delete(node.getCoordString());
    this.closedSet.set(node.getCoordString(), node);
  }

  getDistance(nodeA: AStarNode, nodeB: AStarNode) {
    const rows = Math.abs(nodeA.row - nodeB.row);
    const cols = Math.abs(nodeA.col - nodeB.col);
    return Math.sqrt(Math.pow(rows, 2) + Math.pow(cols, 2));
  }

  getNextNode(): AStarNode | null {
    let nextNode: AStarNode | null = null;
    this.openSet.forEach((node) => {
      if (!nextNode || node.fCost! < nextNode.fCost!) {
        nextNode = node;
      }
    });
    return nextNode;
  }

  attemptToSolve(): SolvedState {
    if (this.openSet.size === 0) {
      return SolvedState.FAILED_TO_SOLVE;
    }

    const previousNode = this.currentNode;
    this.currentNode = this.getNextNode();
    if (previousNode) this.moveNodeToClosedSet(previousNode);

    if (this.currentNode === null) {
      return SolvedState.FAILED_TO_SOLVE;
    }

    this.openSet.delete(this.currentNode.getCoordString());

    if (this.currentNode === this.endNode) {
      return SolvedState.SOLVED;
    }

    const neighbors = this.currentNode.getNeighbors(this);
    const currentNodeGCost = this.currentNode.gCost || 0;

    neighbors.forEach((neighbor) => {
      const tempG =
        currentNodeGCost + this.getDistance(this.currentNode!, neighbor);
      if (neighbor.gCost === null || tempG < neighbor.gCost) {
        neighbor.gCost = tempG;
        neighbor.parent = this.currentNode;
        neighbor.hCost = this.getDistance(neighbor, this.endNode);
        neighbor.fCost = neighbor.gCost + neighbor.hCost;
        if (!this.openSet.has(neighbor.getCoordString())) {
          this.addNodeToOpenSet(neighbor);
        }
      }
    });

    return SolvedState.IN_PROGRESS;
  }
}

export default AStarGrid;
