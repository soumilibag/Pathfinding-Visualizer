import { SPEEDS, TILE_STYLE } from "./constants";
import { sleep } from "./helpers";
import type { GridType, SpeedType } from "./types";
// Destroy walls on the grid, avoiding the start and end tiles
export const destroyWall = async (
  grid: GridType,
  row: number,
  col: number,
  isRight: number,
  speed: SpeedType
) => {
  // Check if the wall to the right exists and is within bounds
  if (isRight && grid[row][col + 1]) {
    grid[row][col + 1].isWall = false;
    document.getElementById(`${row}-${col + 1}`)!.className = TILE_STYLE;
    await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5);
  } else if (grid[row + 1]) { // Check if the wall below exists and is within bounds
    grid[row + 1][col].isWall = false;
    document.getElementById(`${row + 1}-${col}`)!.className = TILE_STYLE;
    await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5);
  } else { // If neither wall exists, destroy the current wall
    grid[row][col].isWall = false;
    document.getElementById(`${row}-${col}`)!.className = TILE_STYLE;
    await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5);
  }
};