import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./Tile";
import { type RefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

export function Grid({
  isVisualizationRunningRef,
}: {
  isVisualizationRunningRef: RefObject<boolean>;
}) {
  const { grid, setGrid } = usePathfinding();
  const [isMouseDown, setIsMouseDown] = useState(false);
  // Handle mouse events for drawing walls on the grid
  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(true);
    const newGrid = createNewGrid(grid, row, col);
    setGrid(newGrid);
  };
  // Handle mouse up event to stop drawing walls
  const handleMouseUp = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(false);
  };
  // Handle mouse enter event to draw walls while dragging the mouse
  const handleMouseEnter = (row: number, col: number) => {
    if (isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col);
      setGrid(newGrid);
    }
  };

  const TILE_SIZE = 17; 
  const gridWidth = MAX_COLS * TILE_SIZE;
  const gridHeight = MAX_ROWS * TILE_SIZE;

  return (
    /* This wrapper lets the grid overflow with a scrollbar instead of breaking layout math */
    <div className="w-full max-w-full overflow-x-auto p-4">
      <div
        className="flex items-center flex-col justify-center border-sky-300 mt-10 mx-auto"
        style={{
          width: `${gridWidth}px`,
          minHeight: `${gridHeight}px`,
        }}
      >
        {grid.map((r, rowIndex) => (
          /* flex-nowrap stops rows from breaking line, shrink-0 guarantees exact box sizing */
          <div key={rowIndex} className="flex flex-nowrap shrink-0">
            {r.map((tile, tileIndex) => {
              const { row, col, isEnd, isStart, isPath, isTraversed, isWall } =
                tile;
              return (
                <Tile
                  key={tileIndex}
                  row={tile.row}
                  col={tile.col}
                  isEnd={isEnd}
                  isStart={isStart}
                  isPath={isPath}
                  isTraversed={isTraversed}
                  isWall={isWall}
                  handleMouseDown={() => handleMouseDown(row, col)}
                  handleMouseUp={() => handleMouseUp(row, col)}
                  handleMouseEnter={() => handleMouseEnter(row, col)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}