import { MAX_COLS, MAX_ROWS } from "./constants";
import type { GridType, TileType } from "./types";

export const getUntraversedNeighbors = (grid: GridType, tile: TileType) => {
  const { row, col } = tile;
  const neighbors = [];
  //push all neighbors of the tile into the neighbors array if they are within bounds of the grid
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < MAX_ROWS - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < MAX_COLS - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  //filter out the neighbors that have already been traversed and return the untraversed neighbors
  return neighbors.filter((neighbor) => !neighbor.isTraversed);
};