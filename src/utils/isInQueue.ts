import { isEqual } from "./helpers";
import type { TileType } from "./types";
// Check if a tile is present in the queue
export function isInQueue(tile: TileType, queue: TileType[]) {
  for (let i = 0; i < queue.length; i++) {
    if (isEqual(tile, queue[i])) return true;
  }
  return false;
}