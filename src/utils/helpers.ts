import { MAX_COLS, MAX_ROWS } from "./constants";
import type { GridType, TileType } from "./types";
const createRow= (row:number, startTile: TileType, endTile: TileType) =>{
    const currentRow=[];
    for (let col=0; col< MAX_COLS; col++){
        currentRow.push({
            row,
            col,
            isEnd: row==endTile.row && col==endTile.col,
            isWall : false,
            isPath: false,
            distance: Infinity,
            isStart : row==startTile.row && col==startTile.col,
            isTraversed: false,
            parent: null,
        });
    }
    return currentRow;
}

export const createGrid= (startTile: TileType, endTile: TileType) => {
    const grid: GridType = [];
    for (let row=0; row<MAX_ROWS; row++){
        grid.push(createRow(row,startTile,endTile));
    }
    return grid;
}
export const checkIfStartOrEnd = (row: number, col: number) => {
  return (
    (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2)
  );
};

export const createNewGrid = (grid: GridType, row: number, col: number) => {
  const newGrid = grid.slice();
  const newTile = {
    ...newGrid[row][col],
    isWall: !newGrid[row][col].isWall,
  };

  newGrid[row][col] = newTile;
  return newGrid;
};

export const isEqual = (a: TileType, b: TileType) => {
  return a.row === b.row && a.col === b.col;
};

export const isRowColEqual = (row: number, col: number, tile: TileType) => {
  return row === tile.row && col === tile.col;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getRandInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const checkStack = (tile: TileType, stack: TileType[]) => {
  for (let i = 0; i < stack.length; i++) {
    if (isEqual(stack[i], tile)) return true;
  }
  return false;
};

export const dropFromQueue = (tile: TileType, queue: TileType[]) => {
  for (let i = 0; i < queue.length; i++) {
    if (isEqual(tile, queue[i])) {
      queue.splice(i, 1);
      break;
    }
  }
};

export const clearTraversalState = (grid: GridType) => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      const tile = grid[row][col];
      tile.distance = Infinity;
      tile.isTraversed = false;
      tile.isPath = false;
      tile.parent = null;
    }
  }
};

export const applyTraversalResult = (
  traversedTiles: TileType[],
  path: TileType[]
) => {
  for (const tile of traversedTiles) {
    tile.isTraversed = true;
  }
  for (const tile of path) {
    tile.isPath = true;
  }
};

export const getTileBorderClasses = (row: number, col: number) => {
  const classes: string[] = [];
  if (row === MAX_ROWS - 1) classes.push("border-b");
  if (col === 0) classes.push("border-l");
  return classes.join(" ");
};

export const setTileElementClass = (row: number, col: number, className: string) => {
  const el = document.getElementById(`${row}-${col}`);
  if (!el) return;

  const borders = getTileBorderClasses(row, col);
  el.className = borders ? `${className} ${borders}` : className;
};